let assert = require('assert')

// QUESTION ONE:
// Write a function called isOdd that returns whether or not a number is odd.
// If something that is not a number is passed in, return false.
const isOdd = (num) => {
  if (isNaN(parseInt(num))) return false;
    // necessary check because true % 2 === 1 => true, (UNWANTED)
    // isNaN(true) => false, (UNWANTED)
    // isNaN(parseInt(true)) => true, (WANTED)
  return num % 2 === 1;
}
runQ1Tests()


// QUESTION TWO:
// Write a function called numberOfDigits that returns how many digits are in a given number
const numberOfDigits = (num) => {
  return num >= 0 ? num.toString().length : num.toString().length - 1;
}
runQ2Tests()

// QUESTION THREE:
// Write a function called disemvowel that removes all of the vowels from a string.
// Treat y as a consonant, not a vowel
const disemvowel = (string) => {
  const vowels = {
    a: 1,
    e: 1,
    i: 1,
    o: 1,
    u: 1
  };
  return string
    .split('')
    .filter(char => !vowels[char.toLowerCase()])
    .join('');
}
runQ3Tests()

// QUESTION FOUR:
// Write a function called secondSmallest that returns the second smallest number in an array
const secondSmallest = (array) => {
  if (array.length < 2) return null;

  const mins = new Array(2).fill(Number.MAX_VALUE);
  array.forEach(num => {
    const min = mins[0];
    const nextMin = mins[1];

    if (num < min) {
      mins.unshift(num);
    } else if (num < nextMin) {
      mins.splice(1, 0, num);
    }
  });

  return mins[1];
}
runQ4Tests()

// QUESTION FIVE:
// Write a function called getLocations that takes in an array of objects that look like the array below,
// and returns an array of the strings corresponding to the value of the location property
// The output should be in the same order as the input
const getLocations = (array) => {
  return array.map(obj => obj.location);
}
// Sample input:
// [{location: "Algeria", population: 41}, {location: "Belize", population: 0.4}, {location: "China", population: 1386}, {location: "Denmark", population: 6}]

// Sample output:
// ["Algeria", "Belize", "China", "Denmark"]

runQ5Tests()


// QUESTION SIX:
// Write a function called onlyOddStrings that takes in an array of strings as input and returns an array that only includes strings with an odd number of characters
// Your function should use a higher-ordered function (e.g map, filter, reduce, every, sort) in its implementation
const onlyOddStrings = (array) => {
  return array.filter(string => string.length % 2 === 1);
}
runQ6Tests()


// QUESTION SEVEN:
// a.
// Make a class called Day
// Give it two properties set by the constructor named temperature and weather
// Give it a method named getDescription that returns a string in the format described below

// Example
// let myDay = Day(80, "sunny")
// myDay.getDescription() // returns "It is 80 degrees and sunny"
class Day {
  constructor(temperature, weather) {
    this.temperature = temperature;
    this.weather = weather;
  }

  getDescription = () => {
    const {temperature, weather} = this;
    return `It is ${temperature} degrees and ${weather}`;
  }
}

//b.
// Make a function called getAllDayDescriptions that takes in an array of Day objects and returns an array of their descriptions.  Use a higher-ordered function (e.g map, filter, reduce, every, sort) in your implementation.
// The output should be in the same order as the input
const getAllDayDescriptions = (array) => {
  return array.map(dayObj => dayObj.getDescription());
}
runQ7Tests()



// The code below is used to test your solutions.  Feel free to look over it, but do not change any of it.

function TestCase(input, output) {
  this.input = input
  this.output = output
  this.formattedInput = () => {
    return JSON.stringify(this.input)
  }
}

function runTests(questionNum, testCases, testCallback) {
  console.log(`Question ${questionNum} Tests`)
  try {
    for (let testCase of testCases) {
      console.log(`Running ${testCallback.name}(${testCase.formattedInput()})`)
      assert.strictEqual(JSON.stringify(testCallback(testCase.input)), JSON.stringify(testCase.output))
    }
    console.log(`All Question ${questionNum} tests passed!\n`)
  }
  catch(error) {
    if (error.expected === undefined) {
      console.log("An unexpected error occurred running the test")
      console.log(error)
    } else {
      console.log(`\nTest failed.  Was expecting "${error.expected}", but got "${error.actual}"`)
    }
  }
}

function runQ1Tests() {
  let testCases = [
    new TestCase(1,true),
    new TestCase(3, true),
    new TestCase(5, true),
    new TestCase(7, true),
    new TestCase("3", true),
    new TestCase(0, false),
    new TestCase(2, false),
    new TestCase(4, false),
    new TestCase(true, false),
    new TestCase(false, false),
    new TestCase(10, false),
    new TestCase(NaN, false),
    new TestCase("hi", false)
  ]
  runTests("One", testCases, isOdd)
}

function runQ2Tests() {
    let testCases = [
      new TestCase(4,1),
      new TestCase(14,2),
      new TestCase(8473,4),
      new TestCase(73746, 5),
      new TestCase(-10, 2),
      new TestCase(0, 1)
    ]
    runTests("Two", testCases, numberOfDigits)
}

function runQ3Tests() {
  let testCases = [
    new TestCase("hello", "hll"),
    new TestCase("What's up?", "Wht's p?"),
    new TestCase("aeaeae", ""),
    new TestCase("y doesn't count", "y dsn't cnt"),
    new TestCase("CAPITAL LETTERS DO COUNT", "CPTL LTTRS D CNT"),
  ]
  runTests("Three", testCases, disemvowel)
}

function runQ4Tests() {
  let testCases = [
    new TestCase([5,1,4,2,5,6], 2),
    new TestCase([1,10,7,90,5,4], 4),
    new TestCase([2,1,4,90,5,6], 2),
    new TestCase([1,3,4,90,5,6], 3)
  ]
  runTests("Four", testCases, secondSmallest)
}

function runQ5Tests() {
  let testCases = [
    new TestCase(
      [
        {location: "Algeria", population: 41},
        {location: "Belize", population: 0.4},
        {location: "China", population: 1386},
        {location: "Denmark", population: 6}
      ],
      ["Algeria", "Belize", "China", "Denmark"]
    ),
    new TestCase([{location: "England", population: 56}], ["England"]),
    new TestCase([], [])
  ]
  runTests("Five", testCases, getLocations)
}

function runQ6Tests() {
  let testCases = [
    new TestCase(
      ["a", "bb", "ccc", "dddd", "eeeee"],
      ["a", "ccc", "eeeee"]
    ),
    new TestCase(
      ["Four", "score", "and", "seven", "years", "ago"],
      ["score", "and", "seven", "years", "ago"]
    ),
    new TestCase(
      ["The", "only", "thing", "we", "have", "to", "fear", "is", "fear", "itself"],
      ["The", "thing"],
    ),
    new TestCase(
      ["one", "two", "three", "four"],
      ["one", "two", "three"]
    ),
    new TestCase([],[]),
    new TestCase(["a"],["a"]),
    new TestCase(["to"],[])
  ]
  runTests("Six", testCases, onlyOddStrings)
}

function runQ7Tests() {
  let testCases = [
    new TestCase(
      [
        new Day(50, "raining"),
        new Day(99, "sunny"),
        new Day(24, "snowing")
      ],
      [
        "It is 50 degrees and raining",
        "It is 99 degrees and sunny",
        "It is 24 degrees and snowing",
      ]
    ),
    new TestCase(
      [
        new Day(31, "sleeting"),
        new Day(88, "partly cloudy")
      ],
      [
        "It is 31 degrees and sleeting",
        "It is 88 degrees and partly cloudy",
      ]
    ),
    new TestCase([], [])
  ]
  runTests("Seven", testCases, getAllDayDescriptions)
}
