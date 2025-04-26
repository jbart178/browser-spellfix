const revealEndpoint = () => {
    document.querySelectorAll('input[name="model"]').forEach(radio => {
        radio.addEventListener('change', (e) => {
            const endpointInput = document.getElementById('endpoint');
            if (e.target.value === 'azure' || e.target.value === 'anythingllm') {
                endpointInput.style.display = 'block';
            } else {
                endpointInput.style.display = 'none';
            }
        });
    });
}

// Saves options to chrome.storage
const saveOptions = () => {
    const apiKey_input = document.getElementById('apiKey').value;
    const endpoint_input = document.getElementById('endpoint').value;

    chrome.storage.local.set(
        { apiKey: apiKey_input, endpoint: endpoint_input },
        () => {
            // Update status to let user know options were saved.
            const status = document.getElementById('status');
            status.textContent = 'Options saved.';
            setTimeout(() => {
                status.textContent = '';
            }, 750);
        }
    );
};

// Restores select box and checkbox state using the preferences
// stored in chrome.storage.
const restoreOptions = () => {
    chrome.storage.local.get(
        { apiKey: "", endpoint: "" },
        (items) => {
            document.getElementById('apiKey').value = items.apiKey;
            document.getElementById('endpoint').value = items.endpoint;
        }
    );
};

document.addEventListener('DOMContentLoaded', restoreOptions);
document.addEventListener('DOMContentLoaded', revealEndpoint);
document.getElementById('save').addEventListener('click', saveOptions);