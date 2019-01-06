While living and working in the Philippines, I noticed the country did not have many options when it came to an aggregated news source. This was especially more so for non-English speakers who make a considerable percent of the country's population - so I decided to make an app.

| Server-Side | DevOps | Front-End |
| --- | --- | --- |
| [Serverless](https://serverless.com/) ([AWS](https://aws.amazon.com/lambda/)) | [Netlify](https://www.netlify.com/) | [Vue](https://vuejs.org/) ([Nuxt](https://nuxtjs.org/))
| [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) | [Cloudinary](https://cloudinary.com/) | [Bootstrap](https://getbootstrap.com/docs/3.4/css/)
  {.table-technologies}
  
![Tagalong.ph](/images/tagalong.png)
{.img-tagalong}
  
## Server-Side
  
  The first piece of the puzzle was to decide what technologies to use in order to store and fetch the articles. The usual suspect was an AWS EC2 instance, but they tend to waste money/energy during idle time. Instead, I decided to try Serverless that ran on top of AWS Lambda. 
  
  Contrast to an EC2 instance, Serverless code is a cloud-function that only activates when it is triggered. After its job is done, AWS Lambda puts the container running the code to sleep before finally ending its lifecycle. This means costs are only accrued during the time of execution, which ended up being a much cheaper solution for my use case, which consisted of RESTapi calls to fetch data from a MongoDB cloud database, and one scheduled function that would periodically check the web for new articles, and store them to the said database.
  
 ## Front-End
 
 In addition to using Vue and Bootstrap, I also wanted to make this app a Progressive Web App (PWA). However, as I had no experience with making PWAs I turned to Google's [Lighthouse](https://developers.google.com/web/tools/lighthouse/) as a checklist to see if I was following best practices. 
      
  One metric I realized the app was lagging in was performance, and further investigation revealed it was caused by unoptimized images. I made it a point that each article had an image to go along with it, but since these images were obtained via a cloud function search, the images were oftentimes too large for a mobile user. An easy fix for this problem was Cloudinary, which not only served as a static image hoster, but also a cloud photoshop service that optimized all the images automatically.  
  
 ## Improvements
 

Before being saved to the database, each article is parsed by a language detection package ([franc](https://wooorm.com/franc/)) in order to determine the dialect of Filipino the article is written in. However, one thing Tagalong currently lacks is categories. In the future, a [text-classification machine learning algorithm](https://developers.google.com/machine-learning/guides/text-classification/) can be applied to properly categorize the articles, regardless of the language. <br/><br/>

In the meantime, check out the live site at [tagalong.ph](https://tagalong.ph/).
