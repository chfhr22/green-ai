import { LandingContent } from "@/components/landingcontent";
import { LandingHero } from "@/components/landinghero";
import { LandingNavbar } from "@/components/landingnavbar";

const LandingPage = () => {
    return (
        <div className="h-full">
            <LandingNavbar />
            <LandingHero />
            <LandingContent />
        </div>
    )
}

export default LandingPage;