# Logic and expressions

The use and study of _logic_ involves finding a new fact by analyzing whether some other facts together can prove to be true. Some facts, or conditions, when looked at together may prove another fact to be true, or maybe false.

If the temperature outside is below freezing and you don't have a coat, you will feel cold. If you're not sick, then you will feel well. If you can swim or ride in a boat in water, you will stay afloat. These are statements of fact that result from some condition being true.

## Truth statements

By taking some facts and putting them into a logical form, we can make an arithmetic that helps us analyze them and make a conclusion. Using the examples just mentioned, let's turn them into some logical word equations:

* ``Outside temperature is freezing`` **AND** ``I have no coat`` **=** ``I feel cold``
* **NOT** ``sick`` **=** ``I feel well``
* ``I can swim`` **OR** ``I'm in a boat`` **=** ``I'm floating``

You see the AND, NOT, and OR in the example word equations? These are our logical _operators_. Every day we make decisions when we think about one or more facts together using these operators. Sometimes, it's necessary for all facts to be true in order for the conclusion to be true. This is the case when the AND operator is used. When analyzing facts with the OR operator, only on fact needs to be true for the conclusion to be true also.

Making a decision may require more than just one or two facts. When this happens, another operator is needed to combine the facts together to make a conclusion. In the last example word equation, you actually might not be floating if just those two condtions are true. To correctly prove that you're actually floating, you need to state that you're in water too.

* **(**``I can swim`` **OR** ``I'm in a boat``**) AND** ``I'm in water`` **=** ``I'm floating``

To prove that you're floating, the two facts that you can swim or you are in a boat must be made into a single fact that is combined with the other fact that you are also in water. Otherwise, if you're able to swim but still on land, or in a boat that is on the beach, you're not not floating.

## Boolean algebra

As a way to reduce the conditions, or facts as we've called them, into a form that is more compact, an algebra was invented. George Boole made a type of arithmetic (Boolean algebra) that uses symbols for the conditions, the operators, and the result. The conditions are considered as variables that have the value of either ``true`` or ``false``. the operators like AND, OR, and NOT are single character symbols. If we want to change the statement "I'm happy when it's sunny or when I'm eating a donut" into a Boolean equation, we could start by making the conditions into variables.

* Variable ``A`` = ``"It's sunny"``
* Variable ``B`` = ``"I've eaten a donut"``

The result then, is a variable called ``Q`` that is true when you're happy and is a value of an operation of ``A`` with ``B``. This operation is OR which is represented by the ``+`` symbol.

``Q`` = ``A + B``

The result of ``Q`` is ``true`` when either it's sunny or you've had a donut. If other things make you happy, like being on vacation, you could add that to the equation.

* Variable ``C`` = ``"I'm on vacation"``

``Q`` = ``A + B + C``

It could be that you're easy to please and you just have to feel well to be happy. So, you're happy when your NOT sick. We'll use the ``~`` to mean NOT in our equation.

* Variable ``A`` = ``"I'm sick"``

``Q`` = ``~A``

In the situation where all conditions must be true for the result to be true, the conditions use the AND operation. For the sun to shine on you, the sky must be clear and it has to be daytime. We put these two facts together with the AND symbol ``·``.

* Variable ``A`` = ``"The sky is clear"``
* Variable ``B`` = ``"It's daytime"``
* Result ``Q`` = ``"The sun is shining"``

``Q`` = ``A · B``

## Expressions

Sometimes different operations on the same conditions can make equivalent results. If we take the opposite case of the last example where the sun is not shining, the variables for that are:

* Variable ``A`` = ``"The sky is clear"``
* Variable ``B`` = ``"It's daytime"``
* Result ``Q`` = ``"The sun is shining"``
* Result ``~Q`` = ``"The sun is NOT shining"``

To make the opposite of ``"the sun is shining"`` we negate, use the NOT symbol, on both sides of the equation.

``~Q`` = ``~(A · B)``

Now, let's think of the sun NOT shining due to negative conditions. If the sky isn't clear OR it's not daytime, then the sun isn't shining. So, the NOT symbol is put in before the variables for each condition so that ``"the sun is NOT shining"`` has another equation like this:

``~Q`` = ``~A + ~B``

We see that the side with the ``A`` and ``B`` variables in both equations are equivalent to each other since they both equate to ``~Q``:

``~(A · B)`` = ``~A + ~B``

The logic equation now doesn't include the result variable ``Q`` but instead there are two _expressions_ that are logically equivalent on each side.

### ~ hint

#### De Morgan's Thereom

That last equation, ``~(A · B)`` = ``~A + ~B``, demonstrates an inportant property in Boolean algebra. It's called De Morgan's Thereom which says that the inverse (NOT) of a conjunction (AND) is logically equivalent to the disjunction (OR) of two inverses (NOT). Also, the inverse (NOT) of a disjunction (OR) is logically equivalent to the conjunction (AND) of two inverses (NOT).

This easier understood by seeing the Boolean equations for both cases:

``~(A · B)`` = ``~A + ~B``

>-- AND --

``~(A + B)`` = ``~A · ~B``

### ~

## Truth tables

A truth table is a way to see all possible condtions for the variables in a logical expression and to chart the results. Using the truth statement about when it's freezing outside and you have no coat, here's the truth table showing the possible conditions and their results:

It's freezing | I have no coat | I feel cold
-|-|-
false | false | false
false | true | false
true | false | false
true | true | true
<br/>

Because you feel cold only when both conditions are true, the statement becomes an AND expression in Boolean algebra.

* Variable ``A`` = ``"it's freezing"``
* Variable ``B`` = ``"I don't have a coat"``

``A · B`` = ``Q``

A truth table for the variables in the expression have the same values as the table for the truth statement (``true`` and ``false`` are abbreviated to just ``T`` and ``F``).

A | B | Q
-|-|-
F | F | F
F | T | F
T | F | F
T | F | T
<br/>

What would happen if we changed the condition of ``"I have no coat"`` to ``"I have a coat"``? How does that affect truth table about how cold you feel?

It's freezing | I have a coat | I feel cold
-|-|-
false | false | false
false | true | false
true | false | true
true | true | false
<br/>

A | B | Q
-|-|-
F | F | F
F | T | F
T | F | T
T | F | F
<br/>

To write a Boolean equation for when you feel cold, we find the condtions in the table where ``Q`` is ``true``. Here we see that you will feel cold only in one row, when condition ``A`` is ``true`` and condtion ``B`` is ``false``. The Boolean equation for these conditions is this:

``A · ~B`` = ``Q``
