export function scrollTo(elementName) {
    console.log(elementName)
    const element = document.getElementById(elementName)
    if (element) { element.scrollIntoView({ behavior: "smooth" }); }
}