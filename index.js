const STORAGE_KEYS = {
	THEME: "portfolio_theme",
	VISITS: "portfolio_visits",
	FORM_DATA: "portfolio_form_data",
};

document.addEventListener("DOMContentLoaded", () => {
	document.querySelectorAll(".read-more-btn").forEach((btn) => {
		const projectCard = btn.closest(".project");
		const porjectId = projectCard.id || projectCard.dataset.id;

		const savedState = loadFromStorage(`Project_${porjectId}`);
		if (savedState?.expanded) {
			projectCard.classList.add("expanded");
			btn.firstChild.textContent = "Read less";
		}

		btn.addEventListener("click", () => {
			const isExpanded = projectCard.classList.toggle("expanded");
			btn.firstChild.textContent = isExpanded ? "Read less" : "Read more";

			saveToStorage(`Project_${porjectId}`, { expanded: isExpanded });

			if (isExpanded) {
				setTimeout(() => {
					projectCard.scrollIntoView({
						behavior: "smooth",
						block: "nearest",
						inline: "nearest",
					});
				}, 350);
			}
		});
	});
});
