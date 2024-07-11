Feature: Eccomerce validation

  Scenario: Logging in
    Given I go to the website and click on sign in
    When I enter {username} and {password} and click on submit
    Then I should be redirected to the My account page