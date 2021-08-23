import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router';
import library from '../../library';

const Screener = () => {
    const { deckName } = useParams()
    const [cards, setCards] = useState([])
    const [allCards, setAllCards] = useState([])
    const [currentCard, setCurrentCard] = useState(0);
    const [displayMode, setDisplayMode] = useState("question");

    const propagateCards = async () => {
        const { result } = await library.api.findCardsForDeck(deckName);
        const cardInfoRequest = await library.api.findCardInfo(result);
        const cardSuspendedInfoRequest = await library.api.checkIfSuspended(result);
        const cardToNotesRequest = await library.api.cardsToNotes(result);
        const cardInfo = cardInfoRequest.result
        const cardSuspendedInfo = cardSuspendedInfoRequest.result;
        const cardNoteIds = cardToNotesRequest.result;
        const cardNoteInfoRequest = await library.api.notesInfo(cardNoteIds);
        const cardNotesInfo = cardNoteInfoRequest.result;
        for (let i = 0; i < cardSuspendedInfo.length; i++) {
            cardInfo[i]['suspended'] = cardSuspendedInfo[i]
        }
        for (let i = 0; i < cardNotesInfo.length; i++) {
            cardInfo[i]['noteInfo'] = cardNotesInfo[i]
        }

        setAllCards([...cardInfo]);
        setCards(cardInfo.filter(card => {
            if (card.suspended === true) return false;
            if (!card.noteInfo) card.noteInfo = { tags: [] };
            if (card.noteInfo.tags.includes("screened") === true) return false;
            return true;
        }))
    }

    window.cCard = currentCard
    window.dMode = displayMode
    window.cCardInfo = cards[currentCard]

    console.log(window.cCardInfo);

    const handleKeyDown = (event) => {
        console.log("Triggered: " + event.keyCode);
        switch (event.keyCode) {
            case 65:
                library.api.addTagToNote(window.cCardInfo.note, "screened");
                setDisplayMode("question")
                setCurrentCard(window.cCard + 1)
                break;
            case 68:
                library.api.suspend(window.cCardInfo.cardId)
                library.api.addTagToNote(window.cCardInfo.note, "screened");
                setDisplayMode("question")
                setCurrentCard(window.cCard + 1)
                break;
            case 32:
                console.log("Flip")
                if (window.dMode === "answer") {
                    setDisplayMode("question")
                } else {
                    setDisplayMode("answer")
                }
                break;
            default:
        }
    };

    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, []);


    useEffect(() => {
        propagateCards();
    }, []);

    return <div>
        <h3 class="title-with-description">
            Screener for {deckName}
        </h3>
        {cards.length > 0 &&
            <div>
                <h4 class="description">Showing card {currentCard + 1} out of {cards.length} cards ({allCards.length - cards.length} suspended or screened)</h4>

                <p>Press <kbd>spacebar</kbd> to reveal the other side of the card. Press <kbd>a</kbd> to approve the card for studying. Press <kbd>d</kbd> to suspend the card. Approving or suspending a card will automatically advance to the next card. </p>

                <div class="card-material" dangerouslySetInnerHTML={{
                    __html: cards[currentCard][displayMode]
                }} />
            </div>}
    </div>
};

export default Screener
