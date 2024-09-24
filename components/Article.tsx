import React from 'react'

interface ArticleProps {
  title: string
  onArticleClick: (articleTitle: string) => void
  onSourceClick: (sourceNumber: number) => void
}

const Article: React.FC<ArticleProps> = ({ title, onArticleClick, onSourceClick }) => {
  const articles = {
    "Dolor Sit Amet": {
      description: "Dolor sit amet is a common placeholder text used in design and typography.",
      sections: [
        {
          heading: "Origins of Dolor Sit Amet",
          content: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do <a href="#" class="text-green-500 hover:underline" data-article="Eiusmod Tempor Incididunt">eiusmod tempor incididunt</a> ut labore et dolore magna aliqua<sup><a href="#" class="text-blue-500" data-source="1">1</a></sup>. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat<sup><a href="#" class="text-blue-500" data-source="2">2</a></sup>.`
        },
        {
          heading: "Usage in Modern Design",
          content: `Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur<sup><a href="#" class="text-blue-500" data-source="3">3</a></sup>. Excepteur sint occaecat cupidatat non proident<sup><a href="#" class="text-blue-500" data-source="4">4</a></sup>, sunt in culpa qui officia deserunt mollit anim id est laborum<sup><a href="#" class="text-blue-500" data-source="5">5</a></sup>.`
        },
        {
          heading: "Variations and Adaptations",
          content: `Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium<sup><a href="#" class="text-blue-500" data-source="6">6</a></sup>, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo<sup><a href="#" class="text-blue-500" data-source="7">7</a></sup>.`
        }
      ]
    },
    "Eiusmod Tempor Incididunt": {
      description: "Eiusmod tempor incididunt is part of the Lorem Ipsum text often used as placeholder content.",
      sections: [
        {
          heading: "Understanding Eiusmod Tempor",
          content: `Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit<sup><a href="#" class="text-blue-500" data-source="1">1</a></sup>, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt<sup><a href="#" class="text-blue-500" data-source="2">2</a></sup>. Neque porro quisquam est, qui <a href="#" class="text-green-500 hover:underline" data-article="Dolor Sit Amet">dolor sit amet</a>, consectetur, adipisci velit<sup><a href="#" class="text-blue-500" data-source="3">3</a></sup>.`
        },
        {
          heading: "Historical Context",
          content: `At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident<sup><a href="#" class="text-blue-500" data-source="4">4</a></sup>, similique sunt in culpa qui officia deserunt mollitia animi<sup><a href="#" class="text-blue-500" data-source="5">5</a></sup>.`
        },
        {
          heading: "Modern Interpretations",
          content: `Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus<sup><a href="#" class="text-blue-500" data-source="6">6</a></sup>, omnis voluptas assumenda est, omnis dolor repellendus<sup><a href="#" class="text-blue-500" data-source="7">7</a></sup>. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet<sup><a href="#" class="text-blue-500" data-source="8">8</a></sup>.`
        }
      ]
    }
  }

  const article = articles[title as keyof typeof articles]

  if (!article) {
    return <div className="p-4 text-red-500">Article not found: {title}</div>
  }

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault()
    const target = e.target as HTMLAnchorElement
    if (target.tagName === 'A') {
      const articleTitle = target.getAttribute('data-article')
      const sourceNumber = target.getAttribute('data-source')
      if (articleTitle) {
        onArticleClick(articleTitle)
      } else if (sourceNumber) {
        onSourceClick(parseInt(sourceNumber))
      }
    }
  }

  return (
    <div className="article" onClick={handleClick}>
      <h1 className="text-3xl font-bold mb-4">{title}</h1>
      <p className="text-gray-600 mb-6">{article.description}</p>
      {article.sections.map((section, index) => (
        <div key={index} className="mb-6">
          <h2 className="text-2xl font-semibold mb-2">{section.heading}</h2>
          <p className="text-gray-800" dangerouslySetInnerHTML={{ __html: section.content }}></p>
        </div>
      ))}
    </div>
  )
}

export default Article