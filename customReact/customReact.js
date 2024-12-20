
function customRender(reactElement, container) {
    // Create a DOM element for the given type
    const domElement = document.createElement(reactElement.type);

    // Add props to the element
    for (const [key, value] of Object.entries(reactElement.props || {})) {
        if (key.startsWith("on")) {
            // Event listener (e.g., onClick -> click)
            const event = key.slice(2).toLowerCase();
            domElement.addEventListener(event, value);
        } else if (key === "className") {
            // Handle className
            domElement.setAttribute("class", value);
        } else {
            // Other attributes (e.g., href, target)
            domElement.setAttribute(key, value);
        }
        
    }

    // Handle children
    if (typeof reactElement.children === "string") {
        // If children is a string, set it as text content
        domElement.textContent = reactElement.children;
    } else if (Array.isArray(reactElement.children)) {
        // If children is an array, recursively render each child
        reactElement.children.forEach(child => customRender(child, domElement));
    }

    // Append the created element to the container
    container.appendChild(domElement);
}

// Example usage
const reactElement = {
    type: "a",
    props: {
        href: "https://google.com",
        target: "_blank",
        className: "link",
        onClick: () => alert("Navigating to Google!")
    },
    children: "Click me to visit Google"
};

const mainContainer = document.querySelector("#root");

customRender(reactElement, mainContainer);



