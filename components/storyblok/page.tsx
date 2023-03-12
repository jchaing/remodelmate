import { storyblokEditable, StoryblokComponent } from '@storyblok/react'

export const Page = ({ blok }: any) => {
  return (
    <main {...storyblokEditable(blok)}>
      {blok.body.map((nestedBlok: any) => (
        <StoryblokComponent blok={nestedBlok} key={nestedBlok._uid} />
      ))}
    </main>
  )
}
