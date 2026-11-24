import { useId } from "react";
import { SERVICE_AREAS } from "@/content";

const nearbyTowns = Object.values(SERVICE_AREAS).flat();

function validLocation(value) {
  return /^\d{5}$/.test(value) || /\p{L}.*\p{L}/u.test(value);
}

export default function EstimateTownFields({ prefix, data, save, onContinue, inputRef }) {
  const id = useId();
  const from = data.fromTown.trim();
  const to = data.toTown.trim();
  const ready = validLocation(from) && (!to || validLocation(to));
  const advance = () => {
    save({ fromTown: from, toTown: to });
    onContinue();
  };
  return (
    <div className={`${prefix}-fields`}>
      <div className={`${prefix}-field`}>
        <label htmlFor={id + "-from"}>Moving from</label>
        <input id={id + "-from"} ref={inputRef} list={id} autoComplete="section-origin address-level2"
          maxLength={100} placeholder="Enfield, CT" value={data.fromTown}
          onChange={e => save({ fromTown: e.target.value })} />
      </div>
      <div className={`${prefix}-field`}>
        <label htmlFor={id + "-to"}>Moving to (if known)</label>
        <input id={id + "-to"} list={id} autoComplete="section-destination address-level2"
          maxLength={100} placeholder="Longmeadow, MA" value={data.toTown}
          onChange={e => save({ toTown: e.target.value })} />
      </div>
      <datalist id={id}>{nearbyTowns.map(town => <option key={town} value={town} />)}</datalist>
      <button type="button" className={`${prefix}-cta`} disabled={!ready} onClick={advance}>Continue</button>
    </div>
  );
}
