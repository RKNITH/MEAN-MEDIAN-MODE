document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('statsForm').addEventListener('submit', function (event) {
        event.preventDefault();

        let numbersInput = document.getElementById('numbers').value.trim();
        let numbersArray = numbersInput.split(',').map(num => parseFloat(num));

        if (numbersArray.some(isNaN)) {
            alert('Please enter valid numbers separated by commas.');
            return;
        }

        let mean = calculateMean(numbersArray);
        let median = calculateMedian(numbersArray);
        let mode = calculateMode(numbersArray);

        displayResults(mean, median, mode);
    });
});

function calculateMean(numbers) {
    let sum = numbers.reduce((acc, val) => acc + val, 0);
    return sum / numbers.length;
}

function calculateMedian(numbers) {
    let sortedNumbers = numbers.slice().sort((a, b) => a - b);
    let middleIndex = Math.floor(sortedNumbers.length / 2);

    if (sortedNumbers.length % 2 === 0) {
        return (sortedNumbers[middleIndex - 1] + sortedNumbers[middleIndex]) / 2;
    } else {
        return sortedNumbers[middleIndex];
    }
}

function calculateMode(numbers) {
    let frequencyMap = {};
    numbers.forEach(num => {
        if (frequencyMap[num]) {
            frequencyMap[num]++;
        } else {
            frequencyMap[num] = 1;
        }
    });

    let maxFrequency = 0;
    let modes = [];

    for (let num in frequencyMap) {
        if (frequencyMap[num] > maxFrequency) {
            modes = [num];
            maxFrequency = frequencyMap[num];
        } else if (frequencyMap[num] === maxFrequency) {
            modes.push(num);
        }
    }

    return modes.join(', ');
}

function displayResults(mean, median, mode) {
    document.getElementById('meanResult').textContent = mean.toFixed(2);
    document.getElementById('medianResult').textContent = median.toFixed(2);
    document.getElementById('modeResult').textContent = mode;
}
