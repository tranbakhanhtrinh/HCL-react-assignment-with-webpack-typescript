import { Props } from 'components/Input/Input';
import './Textarea.scss'

const Textarea: React.FC<Props> = ({ id, label, onChange, error, ...inputProps}) => {
    return (
        <div className="textarea mb-3">
            <label htmlFor={id} className="form-label">
                {label}
            </label>
            <textarea className={`form-control ${error ? "invalid" : ""}`}  id={id} onChange={onChange}  {...inputProps}></textarea>
            {error ? <div className="error-message" data-testid="error-message">{error}</div> : <div style={{height: 24}}></div>}
        </div>
    );
};

export default Textarea;
