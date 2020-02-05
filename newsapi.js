



$(document).ready(function(){
    
    $("#searchbtn").on("click",function(e){
      e.preventDefault();
      let variable ="click";
      if(document.getElementById("searchquery").value==""){
        document.getElementById("searchquery").value=="last";

      }

      
      
        
      let query = $("#searchquery").val();
      
      
      if(document.getElementById("searchquery").value == "it"){
        var url="https://newsapi.org/v2/top-headlines?country=us&category=technology&apiKey=ec817fa2d9cd45e881dab5f3de67dc5c";
      } else if (document.getElementById("searchquery").value == "health") {
        var url="https://newsapi.org/v2/top-headlines?country=us&category=health&apiKey=ec817fa2d9cd45e881dab5f3de67dc5c";
      }else if(document.getElementById("searchquery").value == "business"){
        var url="https://newsapi.org/v2/top-headlines?country=ng&category=business&apiKey=ec817fa2d9cd45e881dab5f3de67dc5c";
      }else if(document.getElementById("searchquery").value == "last"){
        var url = "https://newsapi.org/v2/everything?domains=wsj.com,nytimes.com&apiKey=ec817fa2d9cd45e881dab5f3de67dc5c";
      }else if(document.getElementById("searchquery").value == "bbc"){
        var url="https://newsapi.org/v2/top-headlines?sources=bbc-news&apiKey=ec817fa2d9cd45e881dab5f3de67dc5c";
      }else if(document.getElementById("searchquery").value == "aljazeera"){
        var url="https://newsapi.org/v2/top-headlines?sources=al-jazeera-english&apiKey=ec817fa2d9cd45e881dab5f3de67dc5c";
      }else if(document.getElementById("searchquery").value == "sports"){
        var url="https://newsapi.org/v2/top-headlines?country=ng&category=sports&apiKey=ec817fa2d9cd45e881dab5f3de67dc5c";
      }else if(document.getElementById("searchquery").value == "entertainment"){
        var url="https://newsapi.org/v2/top-headlines?country=ng&category=entertainment&apiKey=ec817fa2d9cd45e881dab5f3de67dc5c";
      }else{
        var url = "https://newsapi.org/v2/top-headlines?q="+query+"&country=us&category=business&apiKey=ec817fa2d9cd45e881dab5f3de67dc5c";
      }




      if(query !== ""){
        
        $.ajax({
          
          url: url,
          method: "GET",
          dataType: "json",
          
          beforeSend: function(){
            $("#loader").show();
          },
          
          complete: function(){
            $("#loader").hide();
          },
          
          success: function(news){
            let output = "";
            let latestNews = news.articles;
            
            for(var i in latestNews){
              output +=`
                <div class="col l6 m6 s12">
                <h4>${latestNews[i].title}</h4>
                <img src="${latestNews[i].urlToImage}" class="responsive-img">
                <p>${latestNews[i].description}</p>
                <p>${latestNews[i].content}</p>
                <p>Published on: ${latestNews[i].publishedAt}</p>
                <a href="${latestNews[i].url}" class="btn">Read more</a>
                </div>
              `;
            }
            
            if(output !== ""){
              $("#newsResults").html(output);
               
              
            }else{
              let noNews = `<div style='text-align:center; font-size:36px; margin-top:40px;'>This news isn't available. Sorry about that.<br>Try searching for something else </div>`;
               $("#newsResults").html(noNews);
              M.toast({
                html: "This news isn't available",
                classes: 'red'
              });
            }
            
          },
          
          error: function(){
             let internetFailure = `
             <div style="font-size:34px; text-align:center; margin-top:40px;">Please check your internet connection and try again.
             <img src="img/internet.png" class="responsive-img">
             </div>`;
             
            $("#newsResults").html(internetFailure);
             M.toast({
                html: "We encountered an error, please try again",
                classes: 'red'
              });
          }
          
          
        });
        
      }else{
        let missingVal = `<div style="font-size:34px; text-align:center; margin-top:40px;">Please enter any search term in the search engine</div>`;
        $("#newsResults").html(missingVal);
         M.toast({
                html: "Please enter something",
                classes: 'red'
              });
      }
      
    });
    
});