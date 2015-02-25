Do you know how to play a golf with a mobile mortar and robot team?
Yeah, robots are very accurate, sp this game is too deterministic, but fun.

There are 5 (five) holes on the square field with size 10x10 units.
You are given coordinates of the holes.
For the winning you should find the shortest way through all holes and your function must return the length of this way.
You are start in the point (0, 0) and can finish in any hole.
The result will be checked with &plusmn;0.01 precision.

![Golf](golf.png)

In this mission the main goal to make your code as short as possible.
The shorter your code, the more points you earn.
Your score for this mission is dynamic and directly related to the length of your code.
For reference, scoring is based on the number of characters used.
350 characters is the maximum allowable and it will earn you zero points.
For each character less than 350, you earn 1 point. For example for 300 character long code earns you 50 points.

**Input:** A set of hole coordinates. Each hole coordinates are represented as a tuple of integers. 

**Output:** The length of the shortest path as a float.

**Example:**

```python
golf({(2, 2), (2, 8), (8, 8), (8, 2), (5, 5)}) == 23.31
golf({(2, 2), (4, 4), (6, 6), (8, 8), (9, 9)}) == 12.73
```
**How it is used:**

This task is not about elegant or performance code.
This is about hacks and tricks in python which help you to shorten your code.
You don't need to use this in production, but it can help for deep comprehension of python.

**Precondition:**
```python
len(holes) == 5
all(0 < x < 10 and 0 < y < 10 for x, y in holes)
```
