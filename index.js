const STORAGE_KEYS = {
	THEME: "portfolio_theme",
	VISITS: "portfolio_visits",
	FORM_DATA: "portfolio_form_data",
};

const trackVisits = () => {
	let visits = loadFromStorage(STORAGE_KEYS.VISITS) || {
		count: 0,
		firstVisit: new Date().toISOString(),
	};
	visits.count++;
	visits.lastVisit = new Date().toISOString();
	saveToStorage(STORAGE_KEYS.VISITS, visits);
	console.log(`Total visits: ${visits.count}`);
};

const handleProjectCards = () => {
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
};

const handleContactForm = () => {
	const form = document.querySelector(".connect-contact form");
	if (!form) return;

	const savedFormData = loadFromStorage(STORAGE_KEYS.FORM_DATA);
	if (savedFormData) {
		Object.keys(savedFormData).forEach((key) => {
			const input = form.elements[key];
			if (input) input.value = savedFormData[key];
		});
	}

	form.addEventListener("input", (e) => {
		const formData = loadFromStorage(STORAGE_KEYS.FORM_DATA) || {};
		formData[e.target.name] = e.target.value;
		saveToStorage(STORAGE_KEYS.FORM_DATA, formData);
	});

	form.addEventListener("submit", (e) => {
		e.preventDefault();

		const overlay = document.getElementById("form-overlay");
		overlay.classList.add("active");

		setTimeout(() => {
			overlay.classList.remove("active");
			clearStorageKey(STORAGE_KEYS.FORM_DATA);
			form.reset();
		}, 3000);
	});
};

document.addEventListener("DOMContentLoaded", () => {
	trackVisits();
	handleProjectCards();
	handleContactForm();
});
