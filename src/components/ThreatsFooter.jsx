import threatFooterLogo from '../assets/media/threat-footer-logo.png'
import './ThreatsFooter.css'

export default function ThreatsFooter() {
  const year = new Date().getFullYear()

  return (
    <footer className="threats-footer">
      <div className="container">
        <div className="threats-footer-inner">
          <img
            src={threatFooterLogo}
            alt="WHTSIPA — Cyber Guardians Threats"
            className="threats-footer-logo"
          />
          <h2 className="threats-footer-title">
            Acknowledgement of Country &amp; Cyber Guardians Threats
          </h2>
          <p className="threats-footer-text">
            We acknowledge the Traditional Private Owners and Custodians of Country throughout and
            their continuing connections to land, sea and communities.
            We pay our respects to them, their past, present and emerging. We also recognise the
            enduring contribution of the First Peoples and all frontline defenders to our national
            security and the global fight against cyber threats.
          </p>
        </div>

        <div className="footer-bottom-bar">
          <div className="footer-bottom-inner">
            <div className="footer-bottom-copy">
              © {year} WHTS · America Cyber Security World. All rights reserved.
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
