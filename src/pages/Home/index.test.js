import { fireEvent, render, screen, findByText, getByRole } from "@testing-library/react";
import Home from "./index";
import { api, DataProvider } from "../../contexts/DataContext";

const eventsMockedData = {
  events: [
    {
        "id": 1,
        "type": "conférence",
        "date": "2022-04-29T20:28:45.744Z",
        "title": "User&product MixUsers",
        "cover": "/images/alexandre-pellaes-6vAjp0pscX0-unsplash.png",
        "description": "Présentation des nouveaux usages UX.",
        "nb_guesses": 900,
        "periode": "14-15-16 Avril",
        "prestations": [
            "1 espace d’exposition",
            "1 scéne principale",
            "1 espace de restaurations"
        ]
    },
    {
        "id": 2,
        "type": "expérience digitale",
        "date": "2022-01-29T20:28:45.744Z",
        "title": "#DigitonPARIS",
        "cover": "/images/charlesdeluvio-wn7dOzUh3Rs-unsplash.png",
        "description": "Présentation des outils analytics aux professionnels du secteur ",
        "nb_guesses": 1300,
        "periode": "24-25-26 Février",
        "prestations": [
            "1 espace d’exposition",
            "1 scéne principale",
            "1 site web dédié"
        ]
    },
    {
        "id": 3,
        "type": "soirée entreprise",
        "date": "2022-03-29T20:28:45.744Z",
        "title": "Mega Event",
        "cover": "/images/chuttersnap-Q_KdjKxntH8-unsplash.png",
        "description": "Présentation des outils analytics aux professionnels du secteur ",
        "nb_guesses": 1300,
        "periode": "24-25-26 Février",
        "prestations": [
            "1 espace d’exposition",
            "1 scéne principale",
            "2 espaces de restaurations",
            "1 site web dédié"
        ]
    },
  ],
  focus: []
}


describe("When Form is created", () => {
  it("a list of fields card is displayed", async () => {
    render(<Home />);
    await screen.findByText("Email");
    await screen.findByText("Nom");
    await screen.findByText("Prénom");
    await screen.findByText("Personel / Entreprise");
  });

  describe("and a click is triggered on the submit button", () => {
    it("the success message is displayed", async () => {
      render(<Home />);
      fireEvent(
        await screen.findByText("Envoyer"),
        new MouseEvent("click", {
          cancelable: true,
          bubbles: true,
        })
      );
      await screen.findByText("En cours");
      await screen.findByText("Message envoyé !", undefined, {timeout: 5000});
    });
  });

});


describe("When a page is created", () => {
  it("a list of events is displayed", async () => {
    window.console.error = jest.fn();
    api.loadData = jest.fn().mockReturnValue(eventsMockedData);
    const { container } = render(
      <DataProvider>
        <Home />
      </DataProvider>
    );

    const sectionEvents = container.querySelector("section.EventsContainer");

    expect(
      getByRole(sectionEvents, "heading", {
        level: 2,
        name: "Nos réalisations",
      })
    ).toBeTruthy();

    await findByText(sectionEvents, "User&product MixUsers");
    await findByText(sectionEvents, "#DigitonPARIS");
    await findByText(sectionEvents, "Mega Event");
  })
  it("a list a people is displayed", async () => {
    const { container } = render(<Home />);

    const sectionPeoples = container.querySelector("section.PeoplesContainer");

    expect(
      getByRole(sectionPeoples, "heading", {
        level: 2,
        name: "Notre équipe",
      })
    ).toBeTruthy();

    await findByText(sectionPeoples, "Samira");
    await findByText(sectionPeoples, "Jean-baptiste");
    await findByText(sectionPeoples, "Alice");
    await findByText(sectionPeoples, "Luís");
    await findByText(sectionPeoples, "Christine");
    await findByText(sectionPeoples, "Isabelle");
  })
  it("a footer is displayed", () => {
    const { container } = render(<Home />);

    const footer = container.querySelector("footer");

    expect(
      getByRole(footer, "heading", {
        level: 3,
        name: "Notre derniére prestation",
      })
    ).toBeTruthy();
    expect(
      getByRole(footer, "heading", {
        level: 3,
        name: "Contactez-nous",
      })
    ).toBeTruthy();

    expect(
      footer.querySelector(".Logo")
    ).toBeInTheDocument();
  })
  it("an event card, with the last event, is displayed", async () => {
    window.console.error = jest.fn();
    api.loadData = jest.fn().mockReturnValue(eventsMockedData);
    const { container } = render(
      <DataProvider>
        <Home />
      </DataProvider>
    );

    const lastEvent = container.querySelector("footer .presta");

    await findByText(lastEvent, "Mega Event");
  })
});
