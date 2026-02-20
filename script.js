const legalTermsDictionary = {
    'shall': 'must',
    'shall not': 'must not',
    'herein': 'in this document',
    'hereinafter': 'from now on',
    'hereby': 'by this',
    'hereof': 'of this',
    'thereof': 'of that',
    'whereas': 'considering that',
    'whereby': 'by which',
    'pursuant to': 'according to',
    'notwithstanding': 'despite',
    'heretofore': 'before this',
    'aforementioned': 'mentioned before',
    'aforesaid': 'said before',
    'forthwith': 'immediately',
    'henceforth': 'from now on',
    'therein': 'in that',
    'thereof': 'of that',
    'undersigned': 'signed below',
    'aforementioned': 'mentioned above',
    'indemnify': 'protect from loss',
    'indemnification': 'protection from loss',
    'liable': 'responsible',
    'liability': 'responsibility',
    'terminate': 'end',
    'termination': 'ending',
    'breach': 'violation',
    'compensation': 'payment',
    'covenant': 'promise',
    'executed': 'signed',
    'force majeure': 'unforeseeable circumstances',
    'null and void': 'invalid',
    'prior to': 'before',
    'subsequent to': 'after',
    'in lieu of': 'instead of',
    'provided that': 'as long as',
    'subject to': 'depending on',
    'with respect to': 'about',
    'in the event that': 'if',
    'for the purpose of': 'to',
    'by virtue of': 'because of',
    'in accordance with': 'following',
    'retain': 'keep',
    'obligated': 'required',
    'remuneration': 'payment',
    'commence': 'start',
    'cease': 'stop',
    'procure': 'obtain',
    'endeavor': 'try',
    'deem': 'consider',
    'accrue': 'accumulate'
};

const importantKeywords = [
    'shall', 'shall not', 'must', 'must not',
    'liable', 'liability', 'responsible',
    'indemnify', 'indemnification',
    'agreement', 'contract',
    'terminate', 'termination', 'cancel',
    'penalty', 'penalties', 'fine',
    'breach', 'violation', 'default',
    'compensation', 'damages', 'payment',
    'obligation', 'obligated', 'required',
    'rights', 'duties',
    'warranty', 'guarantee',
    'confidential', 'confidentiality',
    'force majeure',
    'arbitration', 'litigation'
];

const obligationKeywords = ['shall', 'must', 'required', 'obligated', 'obligation', 'duty', 'responsible'];
const penaltyKeywords = ['penalty', 'penalties', 'fine', 'damages', 'breach', 'violation', 'liable', 'liability', 'terminate', 'termination'];

let originalText = '';
let simplifiedText = '';

document.addEventListener('DOMContentLoaded', function() {
    const legalTextArea = document.getElementById('legalText');
    const simplifyBtn = document.getElementById('simplifyBtn');
    const errorMessage = document.getElementById('errorMessage');
    const outputSection = document.getElementById('outputSection');
    const originalWordCount = document.getElementById('originalWordCount');

    legalTextArea.addEventListener('input', function() {
        const wordCount = countWords(legalTextArea.value);
        originalWordCount.textContent = `Words: ${wordCount}`;
        errorMessage.textContent = '';
    });

    simplifyBtn.addEventListener('click', function() {
        const text = legalTextArea.value.trim();

        if (text === '') {
            errorMessage.textContent = '⚠️ Please enter a legal document to simplify.';
            outputSection.classList.remove('visible');
            return;
        }

        errorMessage.textContent = '';
        originalText = text;
        processDocument(text);
    });
});

function countWords(text) {
    if (!text.trim()) return 0;
    return text.trim().split(/\s+/).length;
}

function processDocument(text) {
    simplifiedText = simplifyText(text);

    const summary = generateSummary(text);
    const keyPoints = extractKeyPoints(text);
    const obligations = extractObligationsAndPenalties(text);

    displayResults(summary, keyPoints, obligations, simplifiedText);
}

function simplifyText(text) {
    let simplified = text;

    const sortedTerms = Object.keys(legalTermsDictionary).sort((a, b) => b.length - a.length);

    for (const term of sortedTerms) {
        const replacement = legalTermsDictionary[term];
        const regex = new RegExp('\\b' + term + '\\b', 'gi');
        simplified = simplified.replace(regex, replacement);
    }

    return simplified;
}

function generateSummary(text) {
    const sentences = text.match(/[^.!?]+[.!?]+/g) || [];
    const importantSentences = [];

    for (const sentence of sentences) {
        const lowerSentence = sentence.toLowerCase();
        let score = 0;

        for (const keyword of importantKeywords) {
            if (lowerSentence.includes(keyword.toLowerCase())) {
                score++;
            }
        }

        if (score > 0) {
            importantSentences.push({ sentence: sentence.trim(), score });
        }
    }

    importantSentences.sort((a, b) => b.score - a.score);

    const topSentences = importantSentences.slice(0, 3).map(item => item.sentence);

    if (topSentences.length === 0) {
        const wordCount = countWords(text);
        return `This document contains ${wordCount} words and appears to be a legal document. It may contain terms and conditions, obligations, and legal requirements that parties must follow.`;
    }

    let summary = 'This document ';

    if (text.toLowerCase().includes('agreement') || text.toLowerCase().includes('contract')) {
        summary += 'is a legal agreement that ';
    }

    const hasObligations = obligationKeywords.some(keyword =>
        text.toLowerCase().includes(keyword)
    );
    const hasPenalties = penaltyKeywords.some(keyword =>
        text.toLowerCase().includes(keyword)
    );

    if (hasObligations && hasPenalties) {
        summary += 'defines specific obligations and includes penalties for non-compliance. ';
    } else if (hasObligations) {
        summary += 'outlines specific obligations that must be followed. ';
    } else if (hasPenalties) {
        summary += 'describes penalties and consequences. ';
    }

    const simplifiedSentence = simplifyText(topSentences[0]);
    summary += simplifiedSentence;

    return summary;
}

function extractKeyPoints(text) {
    const sentences = text.match(/[^.!?]+[.!?]+/g) || [];
    const keyPoints = [];

    for (const sentence of sentences) {
        const lowerSentence = sentence.toLowerCase();
        let isImportant = false;

        for (const keyword of importantKeywords) {
            if (lowerSentence.includes(keyword.toLowerCase())) {
                isImportant = true;
                break;
            }
        }

        if (isImportant && sentence.trim().length > 20) {
            const simplified = simplifyText(sentence.trim());
            if (!keyPoints.includes(simplified) && keyPoints.length < 8) {
                keyPoints.push(simplified);
            }
        }
    }

    if (keyPoints.length === 0) {
        keyPoints.push('This document contains legal terms and conditions.');
        keyPoints.push('Please review all sections carefully.');
        keyPoints.push('Consider consulting a legal professional for clarification.');
    }

    return keyPoints;
}

function extractObligationsAndPenalties(text) {
    const sentences = text.match(/[^.!?]+[.!?]+/g) || [];
    const obligations = [];
    const penalties = [];

    for (const sentence of sentences) {
        const lowerSentence = sentence.toLowerCase();

        const hasObligation = obligationKeywords.some(keyword =>
            lowerSentence.includes(keyword.toLowerCase())
        );

        const hasPenalty = penaltyKeywords.some(keyword =>
            lowerSentence.includes(keyword.toLowerCase())
        );

        if (hasObligation && obligations.length < 5) {
            let highlighted = sentence.trim();
            for (const keyword of obligationKeywords) {
                const regex = new RegExp('\\b' + keyword + '\\b', 'gi');
                highlighted = highlighted.replace(regex, match =>
                    `<span class="highlight-obligation">${match}</span>`
                );
            }
            obligations.push(simplifyText(highlighted));
        }

        if (hasPenalty && penalties.length < 5) {
            let highlighted = sentence.trim();
            for (const keyword of penaltyKeywords) {
                const regex = new RegExp('\\b' + keyword + '\\b', 'gi');
                highlighted = highlighted.replace(regex, match =>
                    `<span class="highlight-penalty">${match}</span>`
                );
            }
            penalties.push(simplifyText(highlighted));
        }
    }

    return { obligations, penalties };
}

function displayResults(summary, keyPoints, obligations, simplifiedText) {
    document.getElementById('summaryOutput').innerHTML = `<p>${summary}</p>`;

    const keyPointsList = document.getElementById('keyPointsOutput');
    keyPointsList.innerHTML = '';
    keyPoints.forEach(point => {
        const li = document.createElement('li');
        li.textContent = point;
        keyPointsList.appendChild(li);
    });

    const obligationsOutput = document.getElementById('obligationsOutput');
    obligationsOutput.innerHTML = '';

    if (obligations.obligations.length > 0) {
        const obligDiv = document.createElement('div');
        obligDiv.innerHTML = '<h4 style="margin-bottom: 10px; color: #856404;">📋 Obligations:</h4>';
        obligations.obligations.forEach(obl => {
            const p = document.createElement('p');
            p.innerHTML = obl;
            p.style.marginBottom = '8px';
            obligDiv.appendChild(p);
        });
        obligationsOutput.appendChild(obligDiv);
    }

    if (obligations.penalties.length > 0) {
        const penDiv = document.createElement('div');
        penDiv.innerHTML = '<h4 style="margin-top: 15px; margin-bottom: 10px; color: #721c24;">⚠️ Penalties & Consequences:</h4>';
        obligations.penalties.forEach(pen => {
            const p = document.createElement('p');
            p.innerHTML = pen;
            p.style.marginBottom = '8px';
            penDiv.appendChild(p);
        });
        obligationsOutput.appendChild(penDiv);
    }

    if (obligations.obligations.length === 0 && obligations.penalties.length === 0) {
        obligationsOutput.innerHTML = '<p>No specific obligations or penalties detected in this document.</p>';
    }

    document.getElementById('simplifiedTextOutput').innerHTML =
        `<p style="white-space: pre-wrap;">${simplifiedText}</p>`;

    const simplifiedWordCount = countWords(simplifiedText);
    document.getElementById('simplifiedWordCount').textContent =
        `Simplified Words: ${simplifiedWordCount}`;

    document.getElementById('outputSection').classList.add('visible');
    document.getElementById('outputSection').scrollIntoView({ behavior: 'smooth', block: 'start' });
}
