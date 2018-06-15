# Better Code Reviews
<small>[Alexander Ivanov](mailto:a.ivanov@shutterfly.com)</small>


***



## What is a code review?

<p class="fragment">Communication Loop</p>
<ul>
	<li class="fragment">push</li>
	<li class="fragment">review</li>
	<li class="fragment">feedback</li>
</ul>

<p class="fragment">approve 👍</p>



---


### Why we actually do code reviews?

<aside class="notes">
	ask people
</aside>

---

Code Improvements

<aside class="notes">
	code reviews over time is a distribution of knowledge. If you did not learn anything about the area it was not as good as it could have been.
</aside>

---

Finding Alternative Solutions

---

Knowledge Transfer

---

Increased Team Awareness

---

Getting up speed

---

Shared Code Ownership

---

Code is a craft Show it off

---

If fast enough almost feels like pair programming

---

Learning new things

<aside class="notes">you don't have to watch over reviews but it helps</aside>

---

“Code review is a discipline of explaining your code to your peers [that] drives a higher standard of coding. I think <u>**the process is even more important than the result**</u>.”

---

“Code review is a discipline of <u>**discussing**</u> your code to your peers [that] drives a higher standard of coding. I think **the process is even more important than the result**.”


---

### So What is code review?

<aside class="notes">best quality gate ever if used right</aside>

***

## Bad Practices

---

LGTM 👍

---

TL;DR;
<blockquote class="fragment">"Ask a programmer to review 10 lines of code, they'll find 10 issues. Ask them to do 500 lines  and they'll say it all looks good" - @girayozil</blockquote>

---

Should never be a formality!

---

Multiple Issues in a single PR

---

Nitpicking

---

While You Are At It!

---

Very Slow Turnarounds

---

Insecurity

<aside class="notes">
	<li>fear</li>
	<li>When corrected -> You are getting smarter!</li>
</aside>

---

No One Believes in Code Revies

---

[How to Use a Code Review to Execute Someone’s Soul](https://daedtech.com/how-to-use-a-code-review-to-execute-someones-soul/)

<aside class="notes">Erik Dietrich</aside>

---

The Bottle Neck

---

Reviewer does not have enough context

***

## Good Code Review

---

### Before code review

<ul>
	<li class="fragment">make sure you really understand the task</li>
	<li class="fragment">get to know with the code if any</li>
	<li class="fragment">think about the testing</li>
	<li class="fragment">think about the implementation</li>
	<li class="fragment">discuss the design of your code we others</li>
	<li class="fragment">make sure everything is clear</li>
	<li class="fragment">code, diff, commit, code, diff, commit, code, diff, commit...</li>
	<li class="fragment">push</li>
</ul>

---

### Actual Code Review

---

Objective and Not personal

---

Focus on design and implementation

---

Is the code SOLID

<p class="fragment">How easy it is to isolate this code and test it?</p>

---

Focus Code Smells

<aside class="notes">
	- Do you know what a code smell is?
	- Can you list 5?
</aside>

---

Should make QE obsolete :D

***

## As an author

---

> "If content is the King - then context is the **God**" - Gary Vaynerchuck

<aside class="notes">We need to provide excellent and sufficient context about our changes</aside>

---

### At first it will be very painful but it pays in the long run

<ul>
	<li class="fragment">Context understanding is one of the most important things</li>
	<li class="fragment">Adds a lot of documentation around the change</li>
	<li class="fragment">People can learn something from this</li>
	<li class="fragment">All of this comments added as context gets to live in the commit when we merge the pull request</li>
</ul>

---

Do atomic commits
	
---
	
Review your own code before asking for review
	
---
	
Add the link to the pull request in the ticket

---

Pull request template

---

```
	# Description, Motivation and Context

	https://jira.corp.shutterfly.com/browse/CHANGE-12345

	... Please explain the changes you made here and add some context to make it a bit easer for all the reviewers and get a better review. Add a short explanation about your code design and why you did things this way ...


	Types of changes
	---

	What types of changes does your code introduce this project?
	_Put an `x` in the boxes that apply_

	- [ ] Bugfix (non-breaking change which fixes an issue)
	- [ ] New feature (non-breaking change which adds functionality)
	- [ ] Breaking change (fix or feature that would cause existing functionality to not work as expected)


	Checklist
	---

	_Put an `x` in the boxes that apply. You can also fill these out after creating the PR. If you're unsure about any of them, don't hesitate to ask. We're here to help! This is simply a reminder of what reviewers are going to look for._

	- [ ] I have read the [CONTRIBUTING](CONTRIBUTING.md) doc
	- [ ] I have checked that Lint and unit tests pass locally with my changes
	- [ ] I have added tests related to my fix/feature
	- [ ] I have made corresponding changes to the documentation (if appropriate)
	- [ ] Is my code readable and easy to understand? - uses good variable names, ...
	- [ ] Is my code using the correct design patterns?


	Test Plan
	---

	... Please describe the tests that you ran to verify your changes. Provide instructions so we can reproduce. Please also list any relevant details for your test configuration. ...
```

<aside class="notes">https://gh.internal.shutterfly.com/shutterfly/pip-client/pull/496</aside>

***

## As a reviewer

---

Ask, Don't tell

---

Avoid conflict

---

Encourage discussion 

---

Demands are not well received

---

Be positive

---

Give credit - especially if you learn something you saw something cool

---

Talk about the code and avoid talking about you

---

Socratic Method - [Socratic method - Wikipedia](https://en.wikipedia.org/wiki/Socratic_method)
<aside class="notes">
	a form of cooperative argumentative dialogue between individuals, based on asking and answering questions to stimulate critical thinking and to draw out ideas and underlying presumptions
</aside>

---

Be time aware
	-> If there is time go for the one percent extra - try to push do person to do even better. And be sure no one likes to change names when he needed to ship this yesterday

---

Liz Lermon Critical Response Process 

[A Method for Giving and Getting Feedback](https://lizlerman.com/critical-response-process/)

<aside class="notes">
	Objective: inspire the creator to go back to their work with fresh eyes, excited about making their creation even better
</aside>

---

Seniority does not matter

<aside class="notes">
	everyone could male a mistake, spot a nasty bug or give an amazing idea<br>
	after you have seen all these tricks you will probably start noticing them - this really means the other person is trying not to be an ass and guide you to see a different perspective
</aside>

---

<!--
- Handle Disagreements
	- This is good it drives for quality... if it is healthy
		- We do not agree on something
		- We do not agree on the process
			- We should discuss this together the whole team
-->

### What to Review

<ul>
	<li class="fragment">
		Encourage Small Changes
		<aside class="notes">easier to provide context | giant pull requests | encourage small commits</aside>
	</li>
	<li class="fragment">
		Single Responsibility Principle
		<aside class="notes">- not even whole SOLID</aside>
	</li>
	<li class="fragment">
		Naming
		<aside class="notes">- good names makes things easier to discuss</aside>
	</li>
	<li class="fragment">
		Complexity
		<aside class="notes">- KISS</aside>
	</li>
	<li class="fragment">YAGNI</li>
	<li class="fragment">Test coverage
		<aside class="notes">- not doing QA we are doing code review</aside>
	</li>
	<li class="fragment">
		Add links to articles
		<aside class="notes">- may be the author is not familiar with this desing pattern, library or framework</aside>
	</li>
	
</ul>

---

### Concepts to consider
<li class="fragment">[Single Responsibility Principle](https://en.wikipedia.org/wiki/Single_responsibility_principle)</li>
<li class="fragment">[Separation of Concerns](https://en.wikipedia.org/wiki/Separation_of_concerns)</li>
<li class="fragment">[Open/Closed Principle](https://en.wikipedia.org/wiki/Open/closed_principle)</li>
<li class="fragment">[DRY](https://en.wikipedia.org/wiki/Don%27t_repeat_yourself)</li>
<li class="fragment">Stability</li>
<li class="fragment">Performance</li>
<li class="fragment">Monitoring</li>

---

### Concepts to consider
<li class="fragment">Testability</li>
<li class="fragment">Dependencies</li>
<li class="fragment">Side effects</li>
<li class="fragment">Edge Cases</li>
<li class="fragment">Verification</li>
<li class="fragment">Technical Debt</li>
<li class="fragment">Refactoring</li>

---

### What about style?

<ul>
	<li class="fragment">This is ridiculously important for me!</li>
	<li class="fragment">
		But it is usually not well received
		<aside class="notes">people feel like you are missing the point</aside>
	</li>
	<li class="fragment">Outsource it - there are linters</li>
	<li class="fragment">and forget about reviewing code style!</li>
	<li class="fragment">Automate duplicated code</li>
	<li class="fragment">So please don't!</li>
</ul>

<!-- 
- In Practice 
	- Insist oh high quality reviews and let's agree to disagree :)
	- Review what is important to you
 -->
***

## Automation

<ul>
	<li class="fragment">Code Style</li>
	<li class="fragment">Conventions</li>
	<li class="fragment">Code Coverage</li>
	<li class="fragment">Tests Passing</li>
	<li class="fragment">Static Analysis</li>
</ul>

---

## Merging

<ul>
	<li class="fragment">Who - has to be comfortable fixing if shit hits the fan</li>
	<li class="fragment">Delete your branch</li>
</ul>

***

## What is the Outcome

---

Strong code review culture

---

Better Code

<aside class="notes">discussions improve the solutions</aside>

---

Better developers

<aside class="notes">you will be reading code and writing code - we are getting the best of each-other</aside>

---

Team ownership

<aside class="notes">the whole team will own the code</aside>

---

Healthy debate

<aside class="notes">A lot team do even have debate, just silent disagreement and do not liking something</aside>


***

## Further Read

---

Talks

---

Articles

---

Books

---

Links

***

# Thank you!

## Q&A
