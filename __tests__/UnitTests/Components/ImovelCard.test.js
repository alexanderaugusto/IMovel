import React from 'react'
import { create } from 'react-test-renderer'
import api from '../../../src/services/api'
import { ImovelCard } from '../../../src/components'

jest.runAllTimers()
jest.mock('@react-navigation/native', () => {
  return {
    ...jest.requireActual('@react-navigation/native'),
    useNavigation: () => ({
      navigate: jest.fn()
    })
  }
})
jest.mock('../../../src/services/api')

describe('ImovelCard unit test', () => { 

  it('should add favorite property', async () => {
    const mockCallback = jest.fn()
    api.put.mockResolvedValue()

    const tree = create(
      <ImovelCard
        favorite={false}
        item={{
          id: 1,
          title: 'Casa para alugar com 2 quartos',
          description:
            'Aconchegante casa para alugar com 3 quartos e 1 banheiro no total. É bem localizado, próximo a pontos de interesse de Liberdade, tais como Estação Liberdade, Estação Sé. etc',
          street: 'Rua Conselheiro Furtado',
          neighborhood: 'Liberdade',
          city: 'São Paulo',
          state: 'SP',
          country: 'Brasil',
          price: 2143,
          bedrooms: 3,
          bathrooms: 1,
          area: 64,
          place: 3,
          animal: true,
          type: 'Apartamento',
          createdAt: '2020-10-18T13:59:30.708Z',
          updatedAt: '2020-10-18T13:59:30.708Z',
          user_id: 1,
          images: [
            {
              id: 1,
              path: '44787f89b5bddb4ed318cadd74b11b13-property1_img1.jpg',
              createdAt: '2020-10-18T13:59:30.771Z',
              updatedAt: '2020-10-18T13:59:30.771Z',
              property_id: 1
            },
            {
              id: 2,
              path: 'b0881d860264b258b075452ecdc8611f-property1_img2.jpg',
              createdAt: '2020-10-18T13:59:30.771Z',
              updatedAt: '2020-10-18T13:59:30.771Z',
              property_id: 1
            },
            {
              id: 3,
              path: '3b8f454f5ec946176577ab1e73c17b27-property1_img3.jpg',
              createdAt: '2020-10-18T13:59:30.771Z',
              updatedAt: '2020-10-18T13:59:30.771Z',
              property_id: 1
            },
            {
              id: 4,
              path: '27c1852232a894cf4956c90e8e172ef5-property1_img4.jpg',
              createdAt: '2020-10-18T13:59:30.771Z',
              updatedAt: '2020-10-18T13:59:30.771Z',
              property_id: 1
            }
          ]
        }}
        onChangeFavorite={mockCallback}
      />
    )

    const button = tree.root.findByProps({ testID: 'btn-favorite' }).props
    await button.onPress()
    expect(mockCallback.mock.calls[0][1]).toBeTruthy()
  })

  it('should remove favorite property', async () => {
    const mockCallback = jest.fn()
    api.delete.mockResolvedValue()

    const tree = create(
      <ImovelCard
        favorite={true}
        item={{
          id: 1,
          title: 'Casa para alugar com 2 quartos',
          description:
            'Aconchegante casa para alugar com 3 quartos e 1 banheiro no total. É bem localizado, próximo a pontos de interesse de Liberdade, tais como Estação Liberdade, Estação Sé. etc',
          street: 'Rua Conselheiro Furtado',
          neighborhood: 'Liberdade',
          city: 'São Paulo',
          state: 'SP',
          country: 'Brasil',
          price: 2143,
          bedrooms: 3,
          bathrooms: 1,
          area: 64,
          place: 3,
          animal: true,
          type: 'Apartamento',
          createdAt: '2020-10-18T13:59:30.708Z',
          updatedAt: '2020-10-18T13:59:30.708Z',
          user_id: 1,
          images: [
            {
              id: 1,
              path: '44787f89b5bddb4ed318cadd74b11b13-property1_img1.jpg',
              createdAt: '2020-10-18T13:59:30.771Z',
              updatedAt: '2020-10-18T13:59:30.771Z',
              property_id: 1
            },
            {
              id: 2,
              path: 'b0881d860264b258b075452ecdc8611f-property1_img2.jpg',
              createdAt: '2020-10-18T13:59:30.771Z',
              updatedAt: '2020-10-18T13:59:30.771Z',
              property_id: 1
            },
            {
              id: 3,
              path: '3b8f454f5ec946176577ab1e73c17b27-property1_img3.jpg',
              createdAt: '2020-10-18T13:59:30.771Z',
              updatedAt: '2020-10-18T13:59:30.771Z',
              property_id: 1
            },
            {
              id: 4,
              path: '27c1852232a894cf4956c90e8e172ef5-property1_img4.jpg',
              createdAt: '2020-10-18T13:59:30.771Z',
              updatedAt: '2020-10-18T13:59:30.771Z',
              property_id: 1
            }
          ]
        }}
        onChangeFavorite={mockCallback}
      />
    )

    const button = tree.root.findByProps({ testID: 'btn-favorite' }).props
    await button.onPress()
    expect(mockCallback.mock.calls[0][1]).toBeFalsy()
  })
})