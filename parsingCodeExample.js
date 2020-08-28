// #README: firebase realtime DB 에서 가져온 데이터 parsing해서 initialState 들에 넣기

const tagArray = firebaseAPI.get(tagArray);
// const exampleFetchedTagArray = { "tag_1": { "style": { marginTop: 30 }, "text" : "수학" } }
//  ^ID         ^style                    ^text
// const initialTags = new Map<string, TagType>([[ID, new TagType(text, style)], [....]]) 

const assigns = firebaseAPI.get(assigns);
// const exampleFetchedAssigns = { "assignList": ["assign_1": {"due": ..., "out": ... , "isCompleted": false, "text": "숙제", ... }, "assign2"], "assignStatus": { "completed": 4, "incompleted": 2, "delayed": 0 } }
// const initialAssignMap = new Map<string, AssignType>([[ID, new AssignType(text, due, out, isCompleted, tagId)], ...])
// const initialAssignState = new AssignStateType(initialAssignMap, completed, inCompleted, delayed)