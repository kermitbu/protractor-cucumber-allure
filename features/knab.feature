@KnabScenario
Feature: Searching for vacancies
  As a job seeker
  I want to search for vacancies
  So that I can find the perfect job

  Scenario: Searching for a vacature
    Given I am on the "https://www.werkenbijknab.nl/" homepage and assert "ONTDEK OF WIJ OP ZOEK ZIJN NAAR JOU!"
    And I search for "HBO"
    And I should assert if "Filter op" is found
    Then I click on a random vacancie
    And I click on Solliciteer
    And I fill in the form with "Name", "Last name", "E-mail", "Mobile number" and "Motivation"
    Then I go back to the homepage