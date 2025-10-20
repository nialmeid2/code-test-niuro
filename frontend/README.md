# Frontend Part of the Take Home Test

This is the frontend part of the Niuro Take Home Test. I focused on making this one first since it would be the one which would take the most time, but also it would help me visualize how to design the backend

## Main decisions

1. **SSG**: Since this project doesn't use Server Actions, I decided to make it generate a static build (output: 'export'). Also, this will make it much easier to deploy afterwards since the result will be a self contained app.

2. **Query the backend with React-Query**: Since doing queries back and forth is really necessary, I found it better to use a battle tested framework that does caching.

3. **Avoid repeated code**: If I make a mistake at a repeated code, I have to fix it twice or more. The less they repeat, the easier to manage (that's where components like Container, PageSkeleton, SearchInput, RouteSkeleton and MoviesGrid came from).

4. **Context API**: Since it's a simpler problem to solve, using Redux, Zustand or Recoil would take some initial time. However, if the project were bigger upfront, I would use something like redux right away since it scales far better.

5. **Using Tailwind's default Colors**: Since they were able to provide me a design that I liked, I decided to go with them instead of using a custom set. If there were no way of making them fit, I would use extend in the globals.css

6. **Infinite Scrolling**: I considered pagination, but infinite scroller flew better and looked just as good, so I went with it

7. **Filter Favorites**: If they grow to be too numerous, finding them might be difficult for the user. 

8. **Favorites come from a database**: I'm saving the favorites in a database (using it via docker container), so they aren't lost when the application refreshes. Also, they implement infinite scrolling so as not to lag the screen

9. **Loading Spinner**: Loading states make the user see the application as more responsive

10. **Details Page**: Since the API accepts querying by id, I found that it would be an excellent feature to query there since it returns a more detailed result. There would be different thing for the user to see there.

11. **Semi-Flat design**: I chose it for three reason mainly: 
	1. It is easier to make something that looks good while being useful
	2. It is faster to make than something more elaborate like neuromorphism
	3. I did use rounded borders at the cards, pure flat is a little bit too restrictive
	
12. **Docker**: Docker makes it easier to simulate how would the entirety of the app run in production

13. **Minor Quality of life Adjustments**: The previous version had a bug where the already found movies on the search screen would flicker on infinite scrolling. I patched that by forcing refetch to be called also on the first call to the API and setting the rendered list there