//1. Select topic & new topic form

let topicList = document.querySelector(".topics-list");

let newTopicForm = document.querySelector(".new-topic-form");

//5. Create a function addTopicToPage that will take 2 parameters: name and list element

const addTopicToPage = (topicName, listElement) => {
    
    //6. Create a new inner list element and update HTML
    let newTopicElement = `
        <li class="list-group-item">
        ${topicName}
        </li>`

    listElement.innerHTML += newTopicElement;
} 

//2. Add event listener onto form and stop prop so the page does not refresh
    //(eventType, action)
        //action could be a function that I am calling

newTopicForm.addEventListener("submit", (event) => {
        event.preventDefault();

        //3. Grab input element and extract/store value
        let topicInput = event.target.elements["new-topic"];
        let topicValue = topicInput.value;

        console.log(topicValue);
        //output is: test

        //4. Validation - check for empty, use BS classes for user feedback

        if (topicValue === "") {
                topicInput.classList.add("is-invalid");
        } else {
            topicInput.classList.remove("is-empty");
        }

        //7. Call function to add the topic to the page

        addTopicToPage(topicValue, topicList);
})

/*
HTML for list topic list item
<li class="list-group-item">
    NEW TOPIC HERE
</li>
*/