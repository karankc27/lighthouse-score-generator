# lighthouse-score-generator

Lighthouse is an open-source tool which is used to generate performance of any web page. We can use CLI or chrome extension to generate lighthouse score for a web page but here is the description of how to generate lighthouse score of multiple urls present in a csv file and generate a csv file consisting of scores of Performance, Accessibility, Best-Practices and SEO for both Mobile and Desktop views.

We use the lighthouse package provided by npm and use the chrome-launcher as well to generate scores of web sites. We can download the package and use them as follows:

npm install --save lighthouse
const lighthouse = require("lighthouse")
After importing this third party package, we are ready to proceed further to import the URL file by using readFileSync method of the default fs package provided by NodeJS and store these URLs in an array from which we will iterate through all the URLs and generate scores for both Mobile and Desktop strategies.

Approach:
Follow the steps below to achieve the solution:

1. Read the csv file using default fs npm package.
2. Convert the data to String and split it in an array.
3. Push the header columns in the array.
4. Launch the chrome using chromeLauncher.launch() method.
5. Create an options object to specify the details of output format, categories, audits and other customization if any you want to have in your output.
6. Traverse through all the urls we have in our array and do the following for each one of it:
  Run two loops: one for mobile and other for desktop scores by specifying options.strategy=mobile or options.strategy=desktop.
  Call the lighthouse function with url i.e. array[i] as the first parameter and options object as the second parameter.
  The object returned would store the details received after calling the lighthouse function.
  We can access the scores from this object and since the scores are in decimals, we need to multiply it with 100 to get it as percentage.
  Push the scores in the result.
7. Append the result in a csv file and end the program.
