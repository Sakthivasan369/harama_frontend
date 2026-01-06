import NewHero from '@/components/about/NewHero'
import Timeline from '@/components/about/Timeline'
import EcosystemGrid from '@/components/about/EcosystemGrid'
import Collaborators from '@/components/about/Collaborators'
import NewFooter from '@/components/about/NewFooter'
import SectionWrapper from '@/components/about/SectionWrapper'

export default function AboutPage() {
  return (
    <main className="bg-gray-50">
      <NewHero />
      <SectionWrapper>
        <Timeline />
      </SectionWrapper>
      <SectionWrapper>
        <EcosystemGrid />
      </SectionWrapper>
      <SectionWrapper>
        <Collaborators />
      </SectionWrapper>
      <NewFooter />
    </main>
  )
}