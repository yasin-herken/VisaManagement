import React from 'react'
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className="footer">
    <div className="container-fluid">
        <div className="row text-muted">
            <div className="col-6 text-start">
                <p className="mb-0">
                    <Link className="text-muted" to="#" target=""><strong>Visa Management</strong></Link> &copy;
                </p>
            </div>
            <div className="col-6 text-end">
                <ul className="list-inline">
                    <li className="list-inline-item">
                        <Link className="text-muted" to="#" target="">Support</Link>
                    </li>
                    <li className="list-inline-item">
                        <Link className="text-muted" to="#" target="">Help Center</Link>
                    </li>
                    <li className="list-inline-item">
                        <Link className="text-muted" to="#" target="">Privacy</Link>
                    </li>
                    <li className="list-inline-item">
                        <Link className="text-muted" to="#" target="">Terms</Link>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</footer>
  )
}

export default Footer;