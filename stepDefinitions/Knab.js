import Globals from '../support/Globals';
import { Given, Then } from "cucumber";

// Chai
const globals = new Globals();
const expect = globals.expect;
const assert = globals.assert;

//Protractor things
var protractor = require('protractor')
var EC = protractor.ExpectedConditions;
var browser = protractor.browser;
var element = protractor.element;
var By = protractor.By;

//Variables for assertions
const ElementHelper = require("../support/ElementHelper");

const waitForPresent = ElementHelper.waitForPresent;
const waitForDisplay = ElementHelper.waitForDisplay;
const waitForElement = ElementHelper.waitForElement;

//Fucntions for random integers
function getRand(getal){
  return Math.floor(Math.random() * getal);
}
function randArt(getal){
  return Math.floor(((Math.random() * getal) + 1)/2);
}

//functions for text and element assertion
function assertText(text) {
  var selector = element(by.xpath("//*[. = '"+ text +"']"));
  browser.wait(EC.presenceOf($("//*[. = '"+ text +"']")), 5000)
  .then(function(){
  }, function(){
      expect(selector.isPresent()).to.eventually.equal(true, "" + text + " is not present.");
  });
}

function assertElement(css) {
  // var selector = element(by.css(""+ css +""));
  browser.wait(EC.presenceOf($(""+ css +"")), 5000)
  .then(function(){
  }, function(){
      expect(element(by.css(""+ css +"")).isPresent()).to.eventually.equal(true, "" + css + " is not present.");
  });
}

function sendString(css, text) {
  var selector = element(by.css(""+ css +""));
  browser.wait(EC.presenceOf($(""+ css +"")), 500)
    .then(function(){
    }, function(){
        expect(selector.isPresent()).to.eventually.equal(true, "" + css + " is not present.");
    });
    selector.sendKeys(text);
}

function randomVancancie(css, attribute) {
  var hreflist = [];
  //Finding all the vacancies and send them to the next function
  var x = element.all(By.css(css)).then(function(elements) {
    elements.forEach(function (element) {
      //Getting all the href attributes for a list
      element.getAttribute(attribute).then(function(text) {
        //Pushing all urls to a list
        hreflist.push(text);
      });
    });
  }).then(function(){
    //Putting the lenght of the href list into the random function to click on a random vacancie
    var selector = "div.grid:nth-child(1) div:nth-child(" + randArt(hreflist.length) +  ") a";
    return element(By.css(selector)).click();
  });
}

  //Setting the timeout for Cucumber JS
  Given('I am on the {string} homepage and assert {string}', function (string, string2) {
    browser.get(string);
    assertElement('#page-home');
    return assertText(string2);
  });
  

  Then('I search for {string}', function (string) {
    //Send input from string to the search field
    sendString('#search-input', string);    
    //Click on the "Bekijk vacatures"-button to search
    assertElement('#filter-submit-label')
    var result = element(By.css('#filter-submit-label'));
    return result.click();;
  });

  Then('I should assert if {string} is found', function (string) {
  //Assert if the page contains the string from the test scenario
  return assertText(string);

  });

  Then('I click on a random vacancie', function () {
    return randomVancancie('#vacancies a', 'href');
  });

  Then('I click on Solliciteer', function () {
    return element(By.css('button.btn-apply-label:nth-child(1)')).click();
  });

  Then('I fill in the form with {string}, {string}, {string}, {string} and {string}', function (string, string2, string3, string4, string5) {
    // Write code here that turns the phrase above into concrete actions
    sendString('#first-name_-1525226443', string);
    sendString('#last-name_-692889215', string2);
    sendString('#email_2005555419', string3);
    sendString('#PHONE_-1776671662', string4);
    return sendString('#COVERLETTERTXT_235657603', string5);
  });
  Then('I go back to the homepage', function () {
    // Write code here that turns the phrase above into concrete actions   
    assertElement('.site-header-desktop a img');
    var result = element(By.css('.site-header-desktop a img'));    
    return result.click();
  });