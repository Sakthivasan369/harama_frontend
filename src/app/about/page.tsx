import NewHero from '@/components/about/NewHero'
import Timeline from '@/components/about/Timeline'
import NewEcosystemGrid from '@/components/about/NewEcosystemGrid'
import Collaborators from '@/components/about/Collaborators'
import NewFooter from '@/components/about/NewFooter'
import SectionWrapper from '@/components/about/SectionWrapper'
import SmoothScrollWrapper from '@/components/about/SmoothScrollWrapper'
import CustomCursor from '@/components/about/CustomCursor'

export default function AboutPage() {
  return (
    <SmoothScrollWrapper>
      <CustomCursor />
      <main className="bg-gray-50">
        <NewHero />
        <SectionWrapper>
          <Timeline />
        </SectionWrapper>
        <SectionWrapper>
          <NewEcosystemGrid />
        </SectionWrapper>
        <SectionWrapper>
          <Collaborators />
        </SectionWrapper>
        <NewFooter />
      </main>
    </SmoothScrollWrapper>
  )
}