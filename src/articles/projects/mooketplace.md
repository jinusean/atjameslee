Mooketplace was the first project I worked on fresh out of school.

Despite having been brought up in New York for nearly my entire life, I wanted to try something new and explore
more areas of the world while I still had my youth. This goal landed me in [Macau](https://goo.gl/maps/R1v72bkEvYJ2){target=_blank}, a <i>Special Administration Region</i> (SAR) of China. Like most Americans, including myself, I had no idea where Macau was, and it was only after a quick Google search that I learned of Macau's very close proximity to its more well-known SAR sibling port-city, Hong Kong.

Prior to working on Mooketplace I was only familiar with programming from an academic perspective, and had spent
most of my time at university coding in Java, and had no experience with web technologies. That being said, I had a lot to catch up on.

Along with learning HTML, CSS, and Javascript, I also had to pick-up on the codebase so that I could contribute to it 
as soon as possible. Mooketplace architecture consisted of three distinct, but three complementing projects: client-facing front-end, admin-facing front-end, & back-end Apis.

### Front-End

- AngularJS + Bootstrap
- Shopping cart logic
- Related items feature
{.ul-disc}

### Back-End
- .NET (C#) + MySQL + AWS
- MVC Architecture, RESTful Apis
- Buy, sell, rate, review, login, etc. functionality 
{.ul-disc}

One challenge we faced late in the development stage was the fact that SPA's are notoriously horrible for search engine optimization (SEO). If you're still using AngularJS in 2018, check out this [article](https://moz.com/blog/optimizing-angularjs-single-page-applications-googlebot-crawlers){target=_blank}. For everyone else that's no longer living in the stone age, I suggest pre-rendering your SPA - which is something [Nuxt](https://nuxtjs.org/api/configuration-generate/){target=_blank} offers right out of the box.


    
