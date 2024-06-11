import './loading.css';

export default function Loading({loadingHeader}){
    return (
        <div className="loading-page">
            <h2>Loading {loadingHeader ? loadingHeader : null} please wait...</h2>
            <div className="loading-animation-container">
                <div><span>testing</span></div>
            </div>
        </div>
    )
}