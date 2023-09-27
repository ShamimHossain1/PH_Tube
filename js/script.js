const dataLoad = async () => {
    const res = await fetch(' https://openapi.programming-hero.com/api/videos/categories')
    const data = await res.json()
    const mainData = data.data;
    // console.log(mainData)
    displayTab(mainData);
}
const displayTab = (data) => {
    // content
    const content = document.getElementById('content');
    data.forEach(element => {
        const div = document.createElement('div');
        div.innerHTML = `<button onclick ='displayInfo(${element.category_id})' class="bg-[#25252533] px-5 py-2 text-lg rounded-md">${element.category}</button>`
        content.appendChild(div);
    });
};

const shortByView = async () => {
    const res = await fetch(`https://openapi.programming-hero.com/api/videos/category/1000`)
    const data = await res.json()
    const displayData = data.data;
    displayData.sort((a, b) => {
        // Extract the numeric view counts from the 'others' object
        const viewsA = parseFloat(a.others.views);
        const viewsB = parseFloat(b.others.views);
        
        // Compare the view counts in descending order
        return viewsB - viewsA;
      });

    console.log(displayData)
    // const views = displayData.others.views;
    // console.log(views);
    const noContent = document.getElementById('no-content');
    noContent.innerHTML = '';

    const contentData = document.getElementById('content-data');
        contentData.innerHTML = '';

    displayData.forEach((element) => {
        // console.log(element);
        //post time 
        const postDate = element?.others?.posted_date;
        const minuteTime = postDate / 60;
        const hoursElement = minuteTime / 60;
        let hours = hoursElement.toFixed(0) + ' hours';
        const minuteElement = minuteTime % 60;
        let minute = minuteElement.toFixed(0) + ' minute ago';
        // console.log(hours);
        if (element.others.posted_date == "") {
            hours = '';
            minute = ''
        }
        // 
        let verified = '';
        if (element.authors[0].verified == true) {
            verified = `<img class="w-5 text-blue-400" src="https://img.icons8.com/ios-filled/50/instagram-check-mark.png" alt="instagram-check-mark"/>`;
        }
        const div = document.createElement('div');
        div.classList = 'relative mx-auto'
        div.innerHTML = `
           <img class = "w-[300px] h-[200px]" src ="${element.thumbnail}">
           <h2 class="absolute left-32 p-1 rounded bottom-36 text-white bg-black  flex text-sm">${hours} ${minute}</h2>
           <div class ="flex mt-5 gap-3">
               <img class = "w-[40px] h-[40px] rounded-full" src ="${element.authors[0].profile_picture}">
              <div class="space-y-2">
                     <h2 class="font-bold">${element.title}</h2>
                 <div class ="flex items-center gap-1">
                     <h2>${element.authors[0].profile_name}</h2>
                     <h2>${verified}</h2>
                 </div>
                     <h2 class="pb-6">${element.others.views} views</h2>
              </div>
           </div>
         `
        contentData.appendChild(div);
    })

}



const displayInfo = async (id = 1000, short) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/videos/category/${id}`)
    const data = await res.json()
    const displayData = data.data;
    const noContent = document.getElementById('no-content');
    noContent.innerHTML = '';





    if (short == true) {
        displayData.sort((a, b) => a.others.views - b.others.views)
        sortDisplay(displayData);
    } else {
        if (displayData.length == 0) {
            const noContent = document.getElementById('no-content');
            noContent.classList.remove('hidden');
            const div = document.createElement('div')
            div.classList = 'text-center mt-16';
            div.innerHTML = `
           <i class="fa-solid fa-video-slash text-6xl mb-3"></i>
           <h2 class="text-3xl font-semibold">Oops!! Sorry, There is no <br> content here</h2>
           `
            noContent.appendChild(div);
        }
        const contentData = document.getElementById('content-data');
        contentData.innerHTML = '';
        displayData.forEach((element) => {
            // console.log(element);
            //post time 
            const postDate = element?.others?.posted_date;
            const minuteTime = postDate / 60;
            const hoursElement = minuteTime / 60;
            let hours = hoursElement.toFixed(0) + ' hours';
            const minuteElement = minuteTime % 60;
            let minute = minuteElement.toFixed(0) + ' minute ago';
            // console.log(hours);
            if (element.others.posted_date == "") {
                hours = '';
                minute = ''
            }
            // 
            let verified = '';
            if (element.authors[0].verified == true) {
                verified = `<img class="w-5 text-blue-400" src="https://img.icons8.com/ios-filled/50/instagram-check-mark.png" alt="instagram-check-mark"/>`;
            }
            const div = document.createElement('div');
            div.classList = 'relative mx-auto'
            div.innerHTML = `
               <img class = "w-[300px] h-[200px]" src ="${element.thumbnail}">
               <h2 class="absolute left-32 p-1 rounded bottom-36 text-white bg-black  flex text-sm">${hours} ${minute}</h2>
               <div class ="flex mt-5 gap-3">
                   <img class = "w-[40px] h-[40px] rounded-full" src ="${element.authors[0].profile_picture}">
                  <div class="space-y-2">
                         <h2 class="font-bold">${element.title}</h2>
                     <div class ="flex items-center gap-1">
                         <h2>${element.authors[0].profile_name}</h2>
                         <h2>${verified}</h2>
                     </div>
                         <h2 class="pb-6">${element.others.views} views</h2>
                  </div>
               </div>
             `
            contentData.appendChild(div);
        })
    }


}

// blog function
const blog = () => {
    window.location.assign("http://127.0.0.1:5500/blog.html");
}


displayInfo();
dataLoad();
// shortByView();



