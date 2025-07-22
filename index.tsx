const form = document.getElementById('wish-form') as HTMLFormElement;
const input = document.getElementById('wish-input') as HTMLTextAreaElement;
const submitButton = document.getElementById('submit-button') as HTMLButtonElement;
const buttonText = submitButton.querySelector('.button-text') as HTMLSpanElement;
const spinner = submitButton.querySelector('.spinner') as HTMLDivElement;
const responseContainer = document.getElementById('response-container') as HTMLElement;

const setButtonLoadingState = (isLoading: boolean) => {
    submitButton.disabled = isLoading;
    if (isLoading) {
        buttonText.textContent = 'Moment...';
        spinner.hidden = false;
    } else {
        buttonText.textContent = 'Wunsch absenden';
        spinner.hidden = true;
    }
};

const displayError = (message: string) => {
    responseContainer.innerHTML = `<div class="error-message">${message}</div>`;
};

/**
 * Calls the backend serverless function to get a manifestation instruction.
 * @param wish The user's wish.
 * @returns A promise that resolves to the instruction text.
 */
const getManifestationInstruction = async (wish: string): Promise<string> => {
    try {
        const response = await fetch('/api/generate', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ action: 'getInstruction', wish }),
        });

        const data = await response.json();

        if (!response.ok) {
            console.error('Server error:', data.error);
            throw new Error(data.error || 'Die Verbindung zum Universum ist gerade gestört.');
        }

        return data.text;
    } catch (error) {
        console.error('Error getting manifestation instruction:', error);
        throw new Error('Die Verbindung zum Universum ist gerade gestört. Versuche es später erneut.');
    }
};

/**
 * Calls the backend serverless function to get an explanation for an instruction.
 * @param instruction The instruction to explain.
 * @returns A promise that resolves to the explanation text.
 */
const getExplanation = async (instruction: string): Promise<string> => {
    try {
        const response = await fetch('/api/generate', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ action: 'getExplanation', instruction }),
        });
        
        const data = await response.json();
        
        if (!response.ok) {
            console.error('Server error:', data.error);
            throw new Error(data.error || 'Die tiefere Bedeutung konnte nicht empfangen werden.');
        }

        return data.text;
    } catch (error) {
        console.error('Error getting explanation:', error);
        throw new Error('Die tiefere Bedeutung konnte gerade nicht empfangen werden. Bitte versuche es später.');
    }
};

const handleExplainClick = async (instruction: string, explainButton: HTMLButtonElement, explanationContainer: HTMLDivElement) => {
    explainButton.disabled = true;
    explanationContainer.innerHTML = `<div class="spinner explanation-spinner"></div>`;

    try {
        const explanationText = await getExplanation(instruction);
        explanationContainer.innerHTML = `<p>${explanationText}</p>`;
    } catch (error) {
        explanationContainer.innerHTML = `<p class="error-message">${error instanceof Error ? error.message : 'Ein Fehler ist aufgetreten.'}</p>`;
    }
};

form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const wish = input.value.trim();
    if (!wish) return;

    setButtonLoadingState(true);
    responseContainer.innerHTML = '';

    try {
        const instructionText = await getManifestationInstruction(wish);
        
        responseContainer.innerHTML = `
            <div class="response-card">
                <h2>Dein liebevoller Rat</h2>
                <p>${instructionText}</p>
                <button class="explain-button" id="explain-btn">Erkläre mir mehr</button>
                <div class="explanation" id="explanation-container"></div>
            </div>
        `;

        const explainButton = document.getElementById('explain-btn') as HTMLButtonElement;
        const explanationContainer = document.getElementById('explanation-container') as HTMLDivElement;

        explainButton.addEventListener('click', () => handleExplainClick(instructionText, explainButton, explanationContainer));

    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Ein unbekannter Fehler ist aufgetreten.';
        displayError(errorMessage);
    } finally {
        setButtonLoadingState(false);
    }
});