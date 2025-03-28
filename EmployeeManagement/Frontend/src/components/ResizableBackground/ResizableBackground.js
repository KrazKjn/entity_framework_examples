import React, { useEffect } from "react";

const backgroundImages = [
    "assets/images/background1.jpg",
    "assets/images/background2.jpg",
    "assets/images/background3.jpg",
];

const ResizableBackground = () => {
    useEffect(() => {
        // Retrieve saved image from session storage or select the default
        const savedImage = sessionStorage.getItem("backgroundImage");
        const currentImage = savedImage || backgroundImages[0];
        const logToConsole = true;

        // Select the next image in the rotation
        const nextImage =
            backgroundImages[
                (backgroundImages.indexOf(currentImage) + 1) % backgroundImages.length
            ];

        // Apply the background
        document.body.style.backgroundImage = `url('${nextImage}')`;
        document.body.style.backgroundSize = "cover";
        document.body.style.backgroundPosition = "center";
        document.body.style.backgroundRepeat = "no-repeat";

        // Save the next image to session storage
        sessionStorage.setItem("backgroundImage", nextImage);
        if (logToConsole) { console.log(`Set image to : ${nextImage}`); }

        // Set dynamic height for the page
        const viewportHeight = window.innerHeight; // Viewport height
        const pages = document.getElementsByClassName('page');
        const itemsHeight = pages.length > 0 ? pages[0].clientHeight : document.documentElement.clientHeight;
        if (logToConsole) { console.log(`Basing Height off of: ${(pages.length > 0 ? "Page" : "document")}`); }
    
        if (itemsHeight <= viewportHeight) {
            if (logToConsole) { console.log(`setDynamicCssHeight: Resetting height to ${viewportHeight} px`); }
            document.documentElement.style.setProperty('--dynamic-height', `${viewportHeight}px`);
            return;
        }
        const scrollHeight = pages.length > 0 ? pages[0].scrollHeight : document.documentElement.scrollHeight; // Scrollable height
        const newHeight = Math.max(viewportHeight, scrollHeight);
        if (logToConsole) { console.log(`setDynamicCssHeight: Setting height to ${newHeight} px`); }
        document.documentElement.style.setProperty('--dynamic-height', `${newHeight}px`);
    
    }, []); // Runs only on mount

    return <div />;
};

export default ResizableBackground;