function query(selector, all = false, parent = document) {
    if (all)
        return parent.querySelectorAll(selector);
    return parent.querySelector(selector);
}
function event(on, event, call) {
    on.addEventListener(event, call);
}
export {query, event};