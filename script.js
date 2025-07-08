document.addEventListener('DOMContentLoaded', () => {
    const inputText = document.getElementById('inputText');
    const wordCountLabel = document.getElementById('wordCount');
    const charCountLabel = document.getElementById('charCount');
    const sentenceCountLabel = document.getElementById('sentenceCount'); // New
    const paragraphCountLabel = document.getElementById('paragraphCount');
    const charNoSpaceCountLabel = document.getElementById('charNoSpaceCount'); // New
    const readingTimeLabel = document.getElementById('readingTime'); // New
    const gradeLevelLabel = document.getElementById('gradeLevel'); // New
    const pasteButton = document.getElementById('pasteButton'); // Changed from countButton

    // Auto-update as user types (more interactive)
    inputText.addEventListener('input', () => {
        const text = inputText.value;
        updateCounts(text);
    });

    // Handle paste button click
    pasteButton.addEventListener('click', async () => {
        try {
            const text = await navigator.clipboard.readText();
            inputText.value = text;
            updateCounts(text);
        } catch (err) {
            console.error('Failed to read clipboard contents: ', err);
            alert('Failed to paste from clipboard. Please use Ctrl+V (Cmd+V) or paste manually.');
        }
    });

    // Initial count when page loads with any default text
    updateCounts(inputText.value);


    function updateCounts(text) {
        // --- Character Count ---
        const charCount = text.length;
        charCountLabel.textContent = charCount;

        // --- Characters without Spaces Count ---
        const charNoSpaceCount = text.replace(/\s/g, '').length;
        charNoSpaceCountLabel.textContent = charNoSpaceCount;

        // --- Word Count ---
        let wordCount = 0;
        const trimmedText = text.trim();
        if (trimmedText !== '') {
            // Split by one or more whitespace characters
            const words = trimmedText.split(/\s+/);
            wordCount = words.length;
        }
        wordCountLabel.textContent = wordCount;

        // --- Paragraph Count ---
        let paragraphCount = 0;
        // Split by one or more newline characters and filter out empty strings
        const paragraphs = text.split(/\n+/).filter(p => p.trim() !== '');
        paragraphCount = paragraphs.length;
        paragraphCountLabel.textContent = paragraphCount;


        // --- Sentence Count --- (Basic, can be improved with more complex regex)
        // Split by period, exclamation, question mark followed by whitespace, then filter empty strings.
        let sentenceCount = 0;
        if (trimmedText !== '') {
            const sentences = trimmedText.split(/[.!?]+\s*/).filter(s => s.trim() !== '');
            sentenceCount = sentences.length;
        }
        sentenceCountLabel.textContent = sentenceCount;


        // --- Reading Time (Estimation) ---
        // Average reading speed: ~200 words per minute
        const wordsPerMinute = 200;
        let minutes = 0;
        let seconds = 0;
        if (wordCount > 0) {
            const totalSeconds = (wordCount / wordsPerMinute) * 60;
            minutes = Math.floor(totalSeconds / 60);
            seconds = Math.round(totalSeconds % 60);
        }
        readingTimeLabel.textContent = `${minutes} m ${seconds} s`;

        // --- Grade Level (Simplified Flesch-Kincaid Readability Test) ---
        // Very basic approximation:
        // Score = 206.835 - (1.015 * ASL) - (84.6 * ASW)
        // ASL = Average Sentence Length (words per sentence)
        // ASW = Average Syllables per Word (very hard to calculate accurately in JS without a library)
        // For simplicity, we'll use a very rough estimation based on average word length for ASW.
        let gradeLevel = '-';
        if (wordCount > 0 && sentenceCount > 0) {
            const averageSentenceLength = wordCount / sentenceCount;
            const averageWordLength = charNoSpaceCount / wordCount; // Rough proxy for syllables
            // This is a gross oversimplification for ASW without a proper syllable counter
            const roughASW = averageWordLength / 3; // Assuming ~3 chars per syllable on avg. (very rough)

            // Flesch-Kincaid formula components
            const score = 206.835 - (1.015 * averageSentenceLength) - (84.6 * roughASW);

            // Map score to a grade level - this mapping is also highly simplified
            if (score > 90) gradeLevel = '5th Grade';
            else if (score > 80) gradeLevel = '6th Grade';
            else if (score > 70) gradeLevel = '7th Grade';
            else if (score > 60) gradeLevel = '8-9th Grade';
            else if (score > 50) gradeLevel = '10-12th Grade';
            else if (score > 30) gradeLevel = 'College';
            else gradeLevel = 'Graduate';
        }
        gradeLevelLabel.textContent = gradeLevel;
    }
});