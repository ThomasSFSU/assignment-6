const root = document.getElementById("root");
let form = document.createElement("form");

let textArea = document.createElement("textarea");
textArea.id = "textBox";
textArea.name = "Text Input";
form.appendChild(textArea);


let submitButton = document.createElement("button");
submitButton.type = "submit";
submitButton.innerText = "Submit";
form.appendChild(submitButton);

form.addEventListener("submit", (e) => {
    e.preventDefault(); // preventDefault is needed to stop the page from reloading on submission.
    const fd = new FormData(form);
    const userInput = textArea.value;

    console.log("User Input: ", userInput);

    // Split the user input into an array of words based on whitespace.
    const words = userInput.split(" ");
    console.log("Space Delimited Words: ", words);

    // Create a map object with user entered words as keys and their frequencies as values.
    const wordFreqs = new Map();
    for (i in words){
        let currentWord = words[i];
        if(wordFreqs.has(currentWord)){
            wordFreqs.set(currentWord, wordFreqs.get(currentWord) + 1);
        } else {
            wordFreqs.set(currentWord, 1);
        }
    }
    console.log("Frequency Map: ", wordFreqs);
    const frequencyObject = Object.fromEntries(wordFreqs);
    console.log("Unsorted Frequency Object: ", frequencyObject);


    let sortedWordFreqs = new Map([...wordFreqs.entries()].sort((a, b) => {
        if(a[1] === b[1]) {return a[0] < b[0];} // If the frequencies are the same, sort based on ascii values.
        else{
            return b[1] - a[1];// Else, sort based on frequencies.
        }
    }));
    const sortedFrequencyObject = Object.fromEntries(sortedWordFreqs);
    console.log("Sorted Frequency Object: ", sortedFrequencyObject)

    // Create a table with the top 5 most frequent words 

    // Create the heading row
    let freqTable = document.createElement("table");
    let newRow = document.createElement("tr");
    let newHeader = document.createElement("th");
    newHeader.innerText = "word_name";
    newRow.appendChild(newHeader);

    let newHeader2 = document.createElement("th");
    newHeader2.innerText = "word_frequency";
    newRow.appendChild(newHeader2);
    freqTable.appendChild(newRow);

    // Add the top 5 keys to the UI table
    const topFiveKeys = Array.from(sortedWordFreqs.keys()).splice(0,5);
    console.log("Top 5 Keys: ", topFiveKeys);
    for(i in topFiveKeys){
        let row = document.createElement("tr");
        let word = topFiveKeys[i];
        let newWord = document.createElement("td");
        newWord.innerText = word;
        let freq = sortedWordFreqs.get(word);
        let newFreq = document.createElement("td");
        newFreq.innerText = freq;
        row.appendChild(newWord);
        row.appendChild(newFreq);
        freqTable.appendChild(row);
    }


    root.appendChild(freqTable);
});
root.appendChild(form);

