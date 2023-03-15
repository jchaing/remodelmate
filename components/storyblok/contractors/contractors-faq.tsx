import { storyblokEditable } from '@storyblok/react'

export const ContractorsFaq = ({ blok }: any) => {
  const faqs = [
    {
      id: 1,
      question: blok.question_1,
      answer: blok.answer_1,
    },
    {
      id: 2,
      question: blok.question_2,
      answer: blok.answer_2,
    },
    {
      id: 3,
      question: blok.question_3,
      answer: blok.answer_3,
    },
    {
      id: 4,
      question: blok.question_4,
      answer: blok.answer_4,
    },
    {
      id: 5,
      question: blok.question_5,
      answer: blok.answer_5,
    },
    {
      id: 6,
      question: blok.question_6, 
      answer: blok.answer_6,
    },
  ]

  return (
    <section {...storyblokEditable(blok)}>
      <div className="bg-white">
        <div className="mx-auto max-w-7xl py-16 px-6 sm:py-24 lg:px-8">
          <h2 className="text-2xl font-bold leading-10 tracking-tight text-gray-900">
            {blok.faq_heading}
          </h2>
          <p className="mt-6 max-w-2xl text-base leading-7 text-gray-600">
            {blok.faq_sub_heading}
            {/* <a
              href="#"
              className="font-semibold text-indigo-600 hover:text-indigo-500"
            >
              sending us an email
            </a>{' '}
            and we’ll get back to you as soon as we can. */}
          </p>
          <div className="mt-20">
            <dl className="space-y-16 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:gap-y-16 sm:space-y-0 lg:grid-cols-3 lg:gap-x-10">
              {faqs.map((faq) => (
                <div key={faq.id}>
                  <dt className="text-base font-semibold leading-7 text-gray-900">
                    {faq.question}
                  </dt>
                  <dd className="mt-2 text-base leading-7 text-gray-600">
                    {faq.answer}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </section>
  )
}
