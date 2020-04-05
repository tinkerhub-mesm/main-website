function loading_animations_active() {
document.getElementById('main_animations').style.display="block";
}
function loading_animations_disable() {
document.getElementById('main_animations').style.display="none";
}
function notificatiionsDisables() {
  document.getElementById('notifications').style.display="none";
}
function notificatiions(parameters) {
document.getElementById('notifications').style.display="block";
document.getElementById('notifications').innerHTML=parameters.messages;
setTimeout(notificatiionsDisables, 3000)
}
