import {FooterAuthor, FooterRegulations, Section, SectionBox} from "../styles/Home.components";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCopyright} from "@fortawesome/free-solid-svg-icons";
import {Link} from "react-router-dom";
import React from "react";
import {useTranslation} from "react-i18next";

const FooterBox = ()=>{
    const { t } = useTranslation();
    return(
            <Section primary={false}>
                <SectionBox size={"1rem"}>
                    <FooterAuthor>
                        <h5 className="footer-header">
                            <FontAwesomeIcon className="icons" icon={faCopyright} />
                            <span>by Magdalena Jarzyna 2022</span>
                        </h5>
                    </FooterAuthor>
                    <FooterRegulations>
                                <span className="footerRegulationsSpan">{t("home_footer_word1")}
                                    <Link to="/termsAndConditions" className="footerRegulationsLink ">{t("home_footer_link_conditions")}</Link>
                                    {t("home_footer_word2")}
                                    <Link to="/privacyPolicy" className="footerRegulationsLink ">{t("home_footer_link_privacy")}</Link>
                                </span>
                    </FooterRegulations>
                </SectionBox>
            </Section>
            )

}
export default FooterBox;