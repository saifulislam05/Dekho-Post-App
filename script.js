const postWrapper = document.getElementById("postWrapper");

const count = 10;

const url = `https://api.unsplash.com/photos/?client_id=${client_id}&count=${count}`;

const fetchPosts = async () => {
  try {
    const response = await fetch(url);
    const data = await response.json();
    
    displayPosts(data);
    console.log(postsArray);
  } catch (error) {
    console.error("Error fetching posts:", error);
  }
};

fetchPosts();

function displayPosts(posts) {
  const fragment = new DocumentFragment();
  posts.forEach((item) => {
    let postCard = createPostCard(item);
    fragment.appendChild(postCard);
  });
  postWrapper.appendChild(fragment);
}
function createPostCard(data) {
  const {
    id,
    alt_description,
    urls: { regular },
    user: {
      name,
      profile_image: { small },
    },
    likes,
  } = data;

  let postCard = document.createElement("div");
  postCard.setAttribute("id", id);
  postCard.innerHTML = `
        <div class="card max-w-lg container bg-base-300 rounded-xl shadow-lg transform transition duration-500 hover:shadow-2xl">
            <div>
             <div class="w-full flex justify-between items-center space-x-2 px-3 pt-3">
                   <div class="flex gap-2">
                     <img id="userImage" class="w-10 rounded-full cursor-pointer" src="${small}" alt="${name}" />
                    <h2 id="username" class="card-title text-base font-bold cursor-pointer">${name}</h2>
                   </div>
                     <div class="">
    
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="inline-block w-5 h-5 stroke-current "><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"></path></svg>
   
                    </div>
                </div>
                <h1 id="description" class="card-title text-sm my-2 ml-4 font-bold cursor-pointer">${alt_description}</h1>
                
            </div>
            <img id="image" class="w-full cursor-pointer" src="${regular}" alt="${alt_description}" />
            <div class="flex p-4 justify-between">
               
                <div class="flex space-x-2 w-full  gap-3">
                   
                    <div class="flex space-x-1 items-center">
                        <span>
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-7 w-7 text-red-500 hover:text-red-400 transition duration-100 cursor-pointer" viewBox="0 0 20 20" fill="currentColor">
                                <path fill-rule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clip-rule="evenodd" />
                            </svg>
                        </span>
                        <span>${likes}</span>
                    </div>
                     <div class="flex space-x-1 items-center">
                        <span>
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-7 w-7 text-gray-600 cursor-pointer" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                            </svg>
                        </span>
                        
                    </div>
                </div>
            </div>
        </div>
    `;

  return postCard;
}

window.addEventListener("scroll", () => {
  if (
    window.scrollY + window.innerHeight >= document.body.offsetHeight
  ) {

    fetchPosts();
  }
});



