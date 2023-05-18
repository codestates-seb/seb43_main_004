import axios, { Method } from 'axios'
import { dtoResponse } from '../dto'
const axiosInstance = (method: Method, url: string) => {
  return axios.create({
    baseURL: `${process.env.REACT_APP_SERVER_URL}/${url}`,
    method: method,
    withCredentials: true,
  })
}

// 제네릭은 미리 타입을 정의하지 않고 사용할 때 정의하는 방식입니다.
// U의 경우 POST, PATCH 등 요청시 사용하는 데이터 타입을 넣고,
// T의 경우 비동기로 반환될 응답 객체의 데이터 타입을 정의합니다.
// 응답 객체의 경우 dtoResponse 를 상속받는 응답객체로 정의해줘야 타입오류가 발생하지 않습니다.
// 사용예제는 UserSignUp.tsx 에서 확인할 수 있습니다.
export const ApiCaller = async <U, T extends dtoResponse>(
  method: Method,
  url: string,
  data?: U
): Promise<T> => {
  let response: T
  try {
    response = await axiosInstance(
      method,
      url
    )({
      data: data,
      url,
      method,
    })
  } catch (error) {
    const customError = new Error()
    /* 필요하다면 커스텀 에러로 변환해서 사용할 수 있습니다. 이때도 제네릭 T와 타입 유형을 일치해야 타입오류가 발생하지 않습니다 */
    response = error as unknown as T
  }

  return response as T
}
