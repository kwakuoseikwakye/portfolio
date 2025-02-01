import { Metadata } from 'next'


export function constructMetadata({
  title = 'Osei Kwakye',
  description = "I am a software engineer with a passion for building scalable and efficient web applications.",
  image = '/thumbnail.png',
  icons = '/kwaku.jpeg',
  noIndex = false
}: {
  title?: string
  description?: string
  image?: string
  icons?: string
  noIndex?: boolean
} = {}): Metadata {
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: [image]
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [image],
      creator: '@kwakuoseikwakye'
    },
    // icons,
    metadataBase: new URL('https://www.kwakuoseikwakye.com'),
    ...(noIndex && {
      robots: {
        index: false,
        follow: false
      }
    })
  }
}
