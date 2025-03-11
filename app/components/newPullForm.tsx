export function NewPullForm() {
  return (
    <div className="flex flex-col items-center justify-center p-4 gap-9 w-[500px] max-w-full ml-auto mr-auto">
      <h1>
        New Tarot Pull
      </h1>
      <form action="">
        <p>Choose a card layout:</p>
        <div className="radio">
          <input type="radio" name="layout" value="Single" />
          <label for="Single">Single</label>
        </div>
        <div className="radio">
          <input type="radio" name="layout" value="Triple" />
          <label for="css">Triple</label>
        </div>
        <div className="radio">
          <input type="radio" name="layout" value="Cross" />
          <label for="Cross">Cross</label>
        </div>
        <p className="checkbox">
          <input type="checkbox" name="AllowReversed" value="AllowReversed" checked />
          <label for="AllowReversed">Allow reversed cards?</label>
        </p>
        <p>
          <label for="Intention">Briefly set an intention:</label>
        </p>
        <input type="text" maxLength="40" name="Intention" placeholder="Optional" />
        <button type="submit">Pull Cards</button>
      </form>
    </div>
  );
}