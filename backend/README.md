# Backend Part of the Take Home Test

This is the backend part of the Niuro Take Home Test. I did this for last since we're not running a DB of our own, but using an API instead, so I could focus on making the frontend function properly and just come here for some final adjustments

## Main decisions

1. **Similarities with C#**: Since I have been coding with C# since 2014, I noticed the similarities instantly. Things like @Get() with your URL inside, Params, Query, etc. Even though Nest is not my expertise, experience can easily translate

2. **Setting frontend first**: From the problem description alone I could notice the heavy lifting was clearly mostly placed at the frontend. After coding the project, I found I was right since it took much more time to do the frontend than the backend. 

3. **Prisma**: At first, I used localStorage to persist the Favorites. Then, in order to make the server more robust and actually closer how to a real life app would function, I decided to move the favorites to be Database Persisted (that's where the postgres container enters). Also, this also created changes in the frontend because now it actually consumes data from the backend, not just third party data

4. **Docker**: It's much better to have a docker container for postgres than installing it locally on my machine. Also, it is great for simulating production environment