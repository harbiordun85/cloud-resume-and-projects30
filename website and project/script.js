document.addEventListener("DOMContentLoaded", function() {
    let jobs = document.querySelectorAll(".timeline div");
    
    jobs.forEach(job => {
        job.addEventListener("click", function() {
            let description = this.querySelector(".description");
            if (description.style.display === "none" || description.style.display === "") {
                description.style.display = "block";
            } else {
                description.style.display = "none";
            }
        });
    });
});
