---
 layout: resume
 title: Manikandan Kumar - Resume
---


Open Source Contribution:
----------------------------------------

I developed open source library Jdbi-folder which removes the the need of any intermediate mappers for ResultSet to Java object conversion in JDBI. It provides annotations like OneToOne and OneToMany (famous in Hibernate), through which it will takes care of complex multi level parent child relationships. It improved our team productivity significantly. I did give the talk in Geeknight Chennai about this library. Currently it is used in many countries.

For more details

  * [Blog][folder-blog]
  * [Geeknight talk] [ytube-link]


Professional Experience:
----------------------------------------

Innovative application developer having 3 years of agile experience in ThoughtWorks. Experience in full software development cycle from concept to effective application.

### TWU Trainer

ThoughtWorks University(TWU) is our graduate training program. It is an awesome program meant to prepare a person for challenges ahead.

##### Duration
  From July 2015

### Promotion

##### Tech stack:

* Micro services architecture
* Multiple Java Services (DropWizard, JDBI, Postgresql)
* Rails aggregation service
* UI with backbone.js

##### Description:
  We developed this product for big Retail client in Italy. They were using excel for their promotional activities for products. They faced difficulty in promotion planning.  Since Promotions running everyday, Promotion management is one of the key factor in their Business. We are building this product for better Promotion planning, early from feedback from stores and helping high level team to evaluate performance at different level.

#####  Client Relationship:
* I was in Italy during our first release to monitor our release activities and conducting further sessions with all our stakeholders to explain the functionalities available in the product.
* My second trip was for "Inception". I did data analysis and involved in Inception with business stakeholders to come up with next set of functionlities to be built.

##### Duration:
  May 2013 - June 2015

#####  Role :
  Full stack developer


### Stores to Cloud:

##### Tech stack:
* Java service(Spring, Mybatis, Postgresql)
* UI - Javascript with our own MVVM framework.

##### Description:
  This product was developed for another big retail client in US. This is targeted for online Pricing and Replenishment. Before our product,  every store had offline data to work. We have moved this data cloud and made it online to all the stores.

#####  Duration:
 July 2012 - March 2013

#####  Role :
 Full stack developer

Skill set
--------------------------------------


<canvas id="myChart" width="100" height="15"></canvas>

Education
------------------------------------

##### Degree: Bachelor of Engineering

#####  Department: Electronics and Communication Engineering

#####  College: Government College of Technology, Coimbatore, India

#####  Percentile: 9.07


Contact
----------------------------------------

#### Address:
  Manikandan Kumar, <br/>
  18/10C Ammal Eari road, <br/>
  5th Cross,Dadagapatty gate, <br/>
  Salem.TamilNadu, India.



[folder-blog]: http://manikandan-k.github.io/jdbi_folder
[ytube-link]: https://www.youtube.com/watch?v=9dGLWKBaagI&index=2&list=PLH8WPOo4hnqy91GVkErUesfJbn_jzk_6q


<script src="chart.js"></script>
<script src="horizontal_bar.js"></script>
<script type="text/javascript">
var data = {
    labels: ["Ruby", "Postgresql", "Dropwizard", "JavaScript" ,"JDBI", "Java"],
    datasets: [
        {
            data: [0.5, 0.6, 0.8, 0.7, 0.9, 0.9],
            fillColor: "#3e9cbf"
        }
    ]
}

var options = {
        animation: false,
      responsive: true,
       scaleShowGridLines : false,
       scaleShowHorizontalLines: false,
       scaleShowVerticalLines: false,
       barShowStroke : false,
       barStrokeWidth : 0.2,
       showScale: true,

}
var ctx = document.getElementById("myChart").getContext("2d");
var myNewChart = new Chart(ctx).HorizontalBar(data, options);
</script>