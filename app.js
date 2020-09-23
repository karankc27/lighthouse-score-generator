const fs = require("fs");
const lighthouse = require("lighthouse");
const chromeLauncher = require("chrome-launcher");

var array = fs.readFileSync("URLs.csv").toString().split("\n");
let result = [];
result.push(
	", URL, Mobile_Performance, Mobile_Accessibility, Mobile_Best_Practices, Mobile_SEO, Desktop_Performance, Desktop_Accessibility, Desktop_Best_Practices, Desktop_SEO"
);
(async () => {
	const chrome = await chromeLauncher.launch({ chromeFlags: ["--headless"] });
	const options = {
		logLevel: "info",
		output: "csv",
		onlyCategories: ["performance", "accessibility", "best-practices", "seo"],
		audits: [
			"first-meaningful-paint",
			"first-cpu-idle",
			"byte-efficiency/uses-optimized-images",
		],
		port: chrome.port,
	};
	for (i in array) {
		for (let x = 0; x < 2; x++) {
			let configuration = "";
			if (x == 0) options.strategy = "mobile";
			else options.strategy = "desktop";
			const runnerResult = await lighthouse(array[i], options);
			const reportCsv = runnerResult.report;
			if (x == 0) {
				result.push("\n");
				result.push(runnerResult.lhr.finalUrl);
			}
			if (runnerResult.lhr.categories.performance.score)
				result.push(runnerResult.lhr.categories.performance.score * 100);
			else result.push("NA");
			if (runnerResult.lhr.categories.accessibility.score)
				result.push(runnerResult.lhr.categories.accessibility.score * 100);
			else result.push("NA");

			if (runnerResult.lhr.categories["best-practices"].score)
				result.push(runnerResult.lhr.categories["best-practices"].score * 100);
			else result.push("NA");
			if (runnerResult.lhr.categories.seo.score)
				result.push(runnerResult.lhr.categories.seo.score * 100);
			else result.push("NA");
			console.log(array[i]);
			console.log(runnerResult.lhr.categories.performance.score * 100);
			console.log(runnerResult.lhr.categories.accessibility.score * 100);
			// prettier-ignore
			if (runnerResult.lhr.categories)
			  console.log(runnerResult.lhr.categories["best-practices"].score);
			 else console.log("NA");
			console.log(runnerResult.lhr.categories.seo.score * 100);
		}
	}

	fs.appendFileSync("lhreport.csv", result);
	await chrome.kill();
})();
