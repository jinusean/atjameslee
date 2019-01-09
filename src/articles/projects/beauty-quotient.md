## Is beauty solely in the eye of the beholder?
### According to mathematicians, no. 

Human beauty is no different from an exquisite painting, or even an architectural marvel in that they all share one common phenomenon – adherence to the Golden Ratio.

The Golden Ratio or Phi or Φ is a mathematical constant whose ratio takes the form of the irrational number 1.6180339887.

![Golden Spiral](/images/beauty-quotient_golden-rectangle.png)**a / b  =  (a + b) / a  =  1.6180339887** 
{.img-golden-rectangle .img-container}

What’s interesting about this ratio is that it is not limited to rectangles and squares, but can also to any geometric shape. Including the human face. 

![Different ratios of the same face](/images/beauty-quotient_different-ratios.jpg)*Which face is the most aesthetic to you? The answer according to Phi is at the end of the page.*
{.text-center .img-container}

For this project, I used an Open Source Computer Vision Library (OpenCV) in order to extract the pixel coordinates of a person’s faces. With the pixel coordinates, I drew rectangles to find their ratios, and compared it to how close they fell in line to the Phi. This took the most of my development time since my trigonometry was a bit rusty, and I had to do perform geometric transformations on the datapoints in order to make sure all the rectangles were at a 90 degree angle. 

![Output of Beauty Quotient program](/images/beauty-quotient_megan-fox.png)*Output of Beauty Quotient*
 {.img-sm .img-container}

What I enjoyed the most about working on this project was getting familiar with machine learning. For years I have heard the phrase “artificial intelligence” and machine learning, and oftentimes dismissed diving into the topic because I thought it was something reserved for PhD candidates. However, after seeing the amazing efficacy of OpenCV, I was immediately enamored to learn more about the technology. Fortunately, there were a number of good resources I was able to find, and soon after learning about the more common algorithms behind neural networks and cost functions, I realized this was a topic that anyone can learn. 

And with that intent in mind, I expect my future projects to have a little more ML in them.

P.S. the face with the most idealistic proportions is the fifth one from the left.

P.S.S. check out this [video](https://www.youtube.com/watch?v=aircAruvnKk&t=78s) if you want to know exactly how neural networks work.


![Desktop](/images/cover-page-golden-ratio.png)*Look familiar? This too adheres to the Golden Ratio*
 {.img-sm .img-container .img-logo}


## References{.project__footer}
https://www.goldennumber.net/golden-ratio-misconceptions-by-george-markowsky-reviewed/

